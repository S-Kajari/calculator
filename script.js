let operandOne = "0";
let operandTwo = "0";
let operator = "+";
let screen =  "";
let result = 0;

//operate function
function operate(x, y, operator){
if (operator === "+"){
    return output = x+y;
}
if (operator === "-"){
    return output = x-y;
}
if (operator === "*"){
    return output = x*y;
}
if (operator === "/"){
    if (y===0){
        return "no division by 0";
    }
    return output = x/y;
}
}

//operand event listener
const buttonsDiv = document.getElementById("gridcontainer");
const numbers = buttonsDiv.querySelectorAll(".operand");
const display = document.getElementById("display");
numbers.forEach((number) => {
    number.addEventListener('click', ()=> {
        clickedOperator ="";
        clickedEqual = false;
        equalTempNum = "";
        if (display.innerText.length < 14){
        if (number.value=="0"){
            if (display.innerText=="0"){
                display.innerText== "0";
            }else{
                screen += number.value;
                display.innerText = screen;
            }
        }else{
            screen += number.value;
            display.innerText = screen;
        }
    }
    })
})

//operator event listener
const operators = buttonsDiv.querySelectorAll(".operator");
let clickedOperator="";
operators.forEach((op) => {
    op.addEventListener('click', ()=>{
        if (display.innerText !="Error"){
            clickedEqual = false;
            equalTempNum = "";
            if (clickedOperator != ""){
                operator = op.value;
            }else {
                operandOne = operandTwo;
                operandTwo = display.innerText;
                result = operate(parseFloat(operandOne), parseFloat(operandTwo), operator);
                if (result == "no division by 0"){
                    operandOne = "0";
                    operandTwo = "0";
                    operator = "+";
                    screen =  "";
                    clickedOperator="";
                    clickedEqual = false;
                    equalTempNum = "";
                    display.innerText = "Error";
                }else{
                    let resultStr = roundAccurately(result, 13).toString();
                    display.innerText = resultStr;
                    operandTwo = result.toString();
                    operator = op.value;
                    clickedOperator = op.value;
                    screen = "";
                }
            }
        }
    })
})
//round the results to 15 length
function roundAccurately(num, places) {
    return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}

//ac button
const acButton = document.querySelector("#ac");
acButton.addEventListener('click', ()=>{
    operandOne = "0";
    operandTwo = "0";
    operator = "+";
    screen =  "";
    clickedOperator="";
    clickedEqual = false;
    equalTempNum = "";
    display.innerText= "0";
})

// +/- button
const plusminusButton = document.querySelector("#plusminus");
plusminusButton.addEventListener('click', ()=> {
    if (display.innerText.length < 14){
        let num = parseFloat(display.innerText)
        screen = (num*-1).toString();
        display.innerText = screen;
        clickedEqual = false;
        equalTempNum = "";
    }
})

//percent button
const percentButton = document.querySelector("#percent");
percentButton.addEventListener('click', ()=>{
    if (display.innerText.length < 14){
        clickedEqual = false;
        equalTempNum = "";
        let num = parseFloat(display.innerText);
        result = num/100
        let resultRound = roundAccurately(result,7);
        display.innerText = resultRound.toString();
        operandOne = "0";
        operandTwo = "0";
        operator = "+";
        screen =  "";
        result = 0;

    }
})

//equal button
const equalButton = document.querySelector("#equal");
let clickedEqual = false;
let equalTempNum = "";
let numA = "";
let numB = "";
equalButton.addEventListener('click', () => {
    screen = "";
    clickedOperator="";
    if (display.innerText !="Error"){
        if (clickedEqual == false){
            clickedEqual = true;
            numA = operandTwo;
            equalTempNum += display.innerText;
            numB = equalTempNum;
            let result = operate(parseFloat(numA), parseFloat(numB), operator);
            if (result == "no division by 0"){
                operandOne = "0";
                operandTwo = "0";
                operator = "+";
                screen =  "";
                clickedOperator="";
                clickedEqual = false;
                equalTempNum = "";
                display.innerText = "Error";
            }else{
                let resultStr = roundAccurately(result, 13).toString();
                display.innerText = resultStr;
                operandOne = "0";
                operandTwo = "0";
            }
        }else {
            numA = display.innerText;
            numB = equalTempNum;
            let result = operate(parseFloat(numA), parseFloat(numB), operator);
            let resultStr = roundAccurately(result, 13).toString();
            display.innerText = resultStr;
        }
    }
})

//decimal button
const decimalButton = document.querySelector("#decimal");
decimalButton.addEventListener('click', () => {
    if (display.innerText.length < 14){
        clickedEqual = false;
        equalTempNum = "";
        if (!display.innerText.includes(".")){
            if (screen == ""){
                screen = "0.";
            }else {
                screen += ".";
            }
            display.innerText = screen;
        }
    }
})
//keyboard
window.addEventListener('keydown', function(e){
    const key = document.querySelector(`button[data-key='${e.keyCode}']`);
    key.click();
});

//clear last input number
display.addEventListener("click", () => {
        screen = display.innerText;
        screen = screen.slice(0, -1);
        display.innerText = screen;
        if (screen == "-" || screen == ""){
            screen = "";
            display.innerText = "0";
        }

})


