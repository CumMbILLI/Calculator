let CALCULATOR = document.querySelector(".calculator")
const NUMBER__ARR = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
const SIGN__ARR = ['-', '+', 'X', '/']
const SIGN__ONE__NUMBER = ['x^2', '1/x', '%', '√x']

let btn = CALCULATOR.querySelectorAll('.btn')
let outputSecond = CALCULATOR.querySelector('.output1')
let outputMain = CALCULATOR.querySelector('.output2')

let firstNumber = ''
let secondNumber = ''
let sign = ''
let result = ''

function clearAll(){
    firstNumber = ''
    secondNumber = ''
    sign = ''
    result = ''
    outputSecond.value = ''
    outputMain.value = "0"
}

function calculation(){
    if(SIGN__ARR.includes(sign)){
        switch (sign) {
            case "+": {
                    result = (+firstNumber) + (+secondNumber)
                    outputSecond.value = `${firstNumber} ${sign} ${secondNumber} =`
                    outputMain.value = result
            }break;
            case "-": {
                result = (+firstNumber) - (+secondNumber)
                outputSecond.value = `${firstNumber} ${sign} ${secondNumber} =`
                outputMain.value = result
            }break;
            case "X": {
                result = (+firstNumber) * (+secondNumber)
                outputSecond.value = `${firstNumber} ${sign} ${secondNumber} =`
                outputMain.value = result
            }break;
            case "/": {
                if (secondNumber !== '0') {
                    result = (+firstNumber) / (+secondNumber)
                    outputSecond.value = `${firstNumber} ${sign} ${secondNumber} =`
                    outputMain.value = result
                } else {
                    clearAll()
                    outputMain.value = "Ошибка!"
                }
            }break;
       }
    }
    else if(SIGN__ONE__NUMBER.includes(sign)){
        if(firstNumber === ''){
            firstNumber = '0'
        }
        switch (sign) {
            case "x^2": {
               
                result = Math.pow(firstNumber, 2)
                outputSecond.value = `Math.pow(${firstNumber})`
                outputMain.value = result
            }break;
            case "1/x":{
                if(firstNumber !== '0'){
                    result = 1/firstNumber
                    outputSecond.value = `1/${firstNumber}`
                    outputMain.value = result
                }
                else{
                    clearAll()
                    outputMain.value = 'Ошибка!'
                }
            }break;
            case "√x":{
                result = Math.sqrt(firstNumber)
                outputMain.value = result
                outputSecond.value = `Math.sqrt(${firstNumber})`
            }break;
        }
    }
}

function clickButton() {
    const key = this.innerHTML
    outputMain.value = ''

    if (NUMBER__ARR.includes(key)) {
        if (secondNumber === '' && sign === '') {
            firstNumber += key
            outputMain.value = firstNumber
        }
        else if (sign !== '' && firstNumber !== '') {
            secondNumber += key
            outputSecond.value = `${firstNumber} ${sign} `
            outputMain.value = secondNumber
        }
        return
    }

    if (SIGN__ARR.includes(key)) {
        if (firstNumber === '') {
            firstNumber = '0'
            sign = key
            outputSecond.value = `${firstNumber} ${sign} `
            outputMain.value = '0'
        }
        else if(result !== ''){
            firstNumber = result
            sign = key
            result = ''   
            secondNumber = ''
            outputSecond.value = `${firstNumber} ${sign} `
            outputMain.value = '0'
        }
        else {
            sign = key
            outputSecond.value = `${firstNumber} ${sign} `
            outputMain.value = '0'
        }
        return
    }

    if(SIGN__ONE__NUMBER.includes(key) && key !== '%'){
        sign = key
        console.log(sign);
        calculation()
    }

    if(key === '%'){
        if(firstNumber !== '' && sign !== ''){
            if(secondNumber === '' && secondNumber === '0') secondNumber = '0'

            else secondNumber = (firstNumber * secondNumber)/100

            outputSecond.value = `${firstNumber} ${sign} ${secondNumber}`
            outputMain.value = secondNumber
        }
        else{
            clearAll()
        }
    }
    if(key === "+/-"){
        let num = 0
        if(sign === ''){
            if(firstNumber === '' || firstNumber === '0') return outputMain.value = '0'
            num = firstNumber
            firstNumber = num *= -1
            outputMain.value = firstNumber
        }
        else if(result === ''){
            if(secondNumber === '' || secondNumber === '0') return outputMain.value = '0'
            num = secondNumber
            secondNumber = num *= -1
            outputMain.value = secondNumber
        }
        else if(result !== ''){
            if(result === '0') clearAll()
            num = result
            result = num *= -1
            outputSecond.value = ''
            outputMain.value = result
        }
    }  
    if (key === '=') {
        if(secondNumber === '') secondNumber = firstNumber

        if(result !== ""){
            firstNumber = result
            result = ''
        }
        calculation()       
    }

    if (key === "CE") {
        if (result !== '' || sign === '') {
            clearAll()
        } 

        else {
            secondNumber = ''
            outputMain.value = '0'
        }
    }
    if (key === "C") {
        clearAll()
        return
    }
    if(key === "⟵"){
        if(sign === ''){
            firstNumber = firstNumber.substring(0, firstNumber.length -1)
            outputMain.value = firstNumber
        }
        else if(sign !== '' && result === ''){
            secondNumber = secondNumber.substring(0, secondNumber.length -1)
            outputMain.value = secondNumber
        }
        else if(result !== ''){
            outputSecond.value = ''
            outputMain.value = result
        }
    }
    if(outputMain.value === ''){
        outputMain.value = '0'
    }
}

for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", clickButton)
}