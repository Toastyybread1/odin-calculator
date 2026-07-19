const DISPLAY = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");

let displayValue = "";
let finishNumber = false;
let errorFlag = false;
let completeOperation = false;
let num1 = "";
let num2 = "";
let operation = "";


function display() {
    DISPLAY.textContent = displayValue;
}

function add(num1,num2) {
    return num1 + num2;
}

function subtract(num1,num2) {
    return num1 - num2;
}

function multiply(num1,num2) {
    return num1*num2;
}

function divide(num1,num2) {
    if (num2 === 0) {
        return "Undefined";
    }
    return num1/num2;
}

function remainder(num1,num2) {
    return num1 % num2;
}

// object that accesses functions
const operatorMap = {
    "+": add,
    "-": subtract,
    "*": multiply,
    "/": divide,
    "%":remainder
};


function operate(operator, n1, n2) {
    let number_1 = Number(n1);
    let number_2 = Number(n2);
    let result = operatorMap[operator](number_1,number_2);

    if (result === "Undefined") {
        displayValue = "Error";
        errorFlag = true;
        console.log(errorFlag);

        
    } else {

        //const periodIndex = result.indexOf(".");
        //if (result.slice(periodIndex)) 
        result = parseFloat(result.toFixed(4));
        console.log(result);

        displayValue = result;

        num1 = String(result);
        num2 = "";
        operation = "";
        finishNumber = false;

    }
    display()
    
}

function handleNumbers(event) {
    // if its undefined the user must clear, not add any more numbers
    if (errorFlag) return;

    const number = event.target.dataset.value;

    //pretty cool, find period first, then whatever 0 or more characters that follow it, then find the last literal character period
    //after use the .test() which searches the string, .search returns the indexes where the regex is found.
    const regexPeriod = /\..*\./
    const hasTwoPeriods = regexPeriod.test(str);


    if ((number == "." && num1.includes(".")) || (number == "." && num2.includes(".")) ) {
        return;
    }
    if (finishNumber == true) {

        if (number == "." && num2.length === 0) {
            displayValue += "0." ;
            num2 += "0.";
        } else {
            displayValue += number;
            num2 += number;
        }
        display();

    } else { 
        if (number == "." && num1.length === 0) {
            displayValue += "0.";
            num2 += "0.";
        } else {
            num1 += number;
            displayValue += number;
        }
        display();

    }
}

function handleOperator(event) {
    if (errorFlag) return;

    const symbol = event.target.dataset.value;

    operation = symbol;
    displayValue = symbol;
    finishNumber = true;
    completeOperation = true;
    display();

}

function clearCalculator () {
    displayValue = "";
    finishNumber = false;
    errorFlag = false;
    num1 = "";
    num2 = "";
    operation = "";
    display();
}
numberButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        handleNumbers(event);
    });
});

operatorButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        handleOperator(event);
    });
});

equalsButton.addEventListener("click", (event) => {
    operate(operation,num1,num2);
});

clearButton.addEventListener("click", clearCalculator);