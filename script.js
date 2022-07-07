const CALCULATOR = document.querySelector(".calculator")
const ALL_SYMBOL = '% CE C ⟵ 1/x x^2 √x / 7 8 9 X 4 5 6 - 1 2 3 + +/- 0 . ='
const NUMBER__ARR = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const SIGN__ARR = ['-', '+', 'X', '/']
const SIGN__ONE__NUMBER = ['x^2', '1/x', '%', '√x']

const buttonsBox = CALCULATOR.querySelector('.buttons__box')
let outputSecond = CALCULATOR.querySelector('.output_second')
let outputMain = CALCULATOR.querySelector('.output_main')
outputMain.innerHTML = '0'

let signOne = ''
let firstNumber = ''
let secondNumber = ''
let sign = ''
let result = ''

const clearAll = () => {
    signOne = ''
    firstNumber = ''
    secondNumber = ''
    result = ''
    sign = ''
    outputMain.innerHTML = '0'
    outputSecond.innerHTML = ''
}

const outputResult = () => {
    outputMain.innerHTML = result = +result.toFixed(6)
    outputSecond.innerHTML = `${Number(firstNumber)} ${sign} ${Number(secondNumber)} =`
}

const outputNumber = (num)=> {
    outputMain.innerHTML = Number(num)
    String(num)
}

const calculation = () => {
    if (result !== '') firstNumber = result
    if(secondNumber === '') secondNumber = '0'
    
    switch (sign) {
        case '+': {
            result = +firstNumber + +secondNumber
            outputResult()
        }break;
        case '-': {
            result = +firstNumber - +secondNumber
            outputResult()
        }break;
        case 'X': {
            result = +firstNumber * +secondNumber
            outputResult ()
        }break;
        case '/': {
            secondNumber !== '0'? (result = +firstNumber / +secondNumber, outputResult()) :
            (clearAll(), outputMain.innerHTML = 'Ошибка / на 0')
        }break;
        default: {
            clearAll()
            outputMain.innerHTML = 'Ошибка'
        }break;
    }
}

const signOneNumber = (num)=> {
    switch(signOne){
        case 'x^2': {
            num = Math.pow(num, 2)
        }break;
        case '1/x':{
            num !== '0' ? num = 1/num : outputMain.innerHTML = "Ошибка"
        }break;
        case '√x':{
            if(Number(num) < 0){
                clearAll()
                outputMain.innerHTML = 'Ошибка'
            }
            else num = Math.sqrt(num)
        }break;
        case '%':{
            if(firstNumber !== '' && sign === '') num = Number(firstNumber)/100
            else if(secondNumber !== '0' && secondNumber !== '' && result === '') num = secondNumber = (firstNumber * secondNumber)/100
            else if(result !== '') num = result = result/100
            
        }break;
        default:{
            console.log("Ошибка");
        }break;
    }

    if(String(num).includes('.')) num = Number(num).toFixed(5)

    if(sign !== '' && result === ''){
        secondNumber = num
        outputMain.innerHTML = Number(secondNumber)
    }
    if(sign === '') {
        firstNumber = num
        outputMain.innerHTML = Number(firstNumber)
    }
    if(result !== ''){
        result = num
        outputSecond.innerHTML = ''
        outputMain.innerHTML = Number(result)
    }
    if(outputMain.innerHTML === '') outputMain.innerHTML = '0'
}

const otherSymbol = (symbol)=> {
    if(firstNumber === '') firstNumber = '0'
    if(secondNumber === '') secondNumber = '0'

    switch(symbol){
        case '=':{
            if(sign === '') return
            calculation()
        }break;
        case 'CE':{
            if(sign !== '' && result === '') secondNumber = ''  
            else if(result !== '') clearAll()
            else firstNumber = ''

            outputMain.innerHTML = '0'
        }break;
        case 'C':{
            clearAll()
        }break;
        case '+/-':{
            if (sign === '') outputMain.innerHTML = firstNumber *= -1
            if(sign !== '' && result === '') outputMain.innerHTML = secondNumber *= -1
            if(result !== '') outputMain.innerHTML = result *= -1
            
        }break;
        case '.':{
            if(sign !== '' && result === '') {
                if(!String(secondNumber).includes('.')){
                    secondNumber += symbol
                    outputMain.innerHTML = secondNumber
                }
                else return
            }
            else if(sign === ''){
                if(!String(firstNumber).includes('.')){
                    firstNumber += symbol
                    outputMain.innerHTML = firstNumber
                }
                else return
            }
            else {
                clearAll()
                firstNumber +='0' + symbol
                outputMain.innerHTML = firstNumber
            }  
        }break;
        case '⟵':{
            result !== ''? clearAll() :
            sign === '' ? (firstNumber = Number(firstNumber), firstNumber = String(firstNumber).substring(0, String(firstNumber).length-1), outputMain.innerHTML = firstNumber) :
            (secondNumber = Number(secondNumber), secondNumber = String(secondNumber).substring(0,String(secondNumber).length-1), outputMain.innerHTML = secondNumber)

            if(outputMain.innerHTML === '') outputMain.innerHTML = '0'
        }break;
        default:{
            clearAll()
            outputMain.innerHTML = 'Ошибка'
        } 
    }
}

const clickButton = (keyPress) => {
    NUMBER__ARR.includes(keyPress) ? (
            firstNumber !== '', sign !== '', secondNumber !== '', result !== ''? clearAll() :
            sign === '' ? (firstNumber += keyPress, outputNumber(firstNumber)) :
            result !== '' ? (firstNumber = keyPress, outputMain.innerHTML = firstNumber, outputSecond.innerHTML = '') :
            (secondNumber += keyPress, outputNumber(secondNumber))
        ) :
        SIGN__ARR.includes(keyPress) ? (
            secondNumber = '',
            
            firstNumber === ''? firstNumber = '0' :
            firstNumber !== '', result !== '' ? (firstNumber = result, result = '', sign = keyPress, outputSecond.innerHTML = `${Number(firstNumber)} ${sign} `,
                outputMain.innerHTML = '0') :
            (sign = keyPress, outputSecond.innerHTML = `${Number(firstNumber)} ${sign} `,
                outputMain.innerHTML = '0')
        ) :
        SIGN__ONE__NUMBER.includes(keyPress) ? (
            signOne = keyPress,
            signOneNumber(outputMain.innerHTML)
        ) :
        otherSymbol(keyPress)       
}

ALL_SYMBOL.split(' ').map(elem => {
    NUMBER__ARR.includes(elem) ? buttonsBox.insertAdjacentHTML('beforeend', `<button class = "btn" value="${elem}">${elem}</button>`) :
        elem === '=' ? buttonsBox.insertAdjacentHTML('beforeend', `<button class = "btn btn__blue" value="${elem}">${elem}</button>`) :
        buttonsBox.insertAdjacentHTML('beforeend', `<button class = "btn btn__sign" value="${elem}">${elem}</button>`)
})

CALCULATOR.querySelectorAll('.btn').forEach(elem => {
    elem.addEventListener("click", () => clickButton(elem.value))
});