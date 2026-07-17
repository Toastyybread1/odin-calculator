const DISPLAY = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");

let displayValue = "";
let finishNumber = false;
let errorFlag = false;
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

const operatorMap = {
    "+": add,
    "-": subtract,
    "*": multiply,
    "/": divide,
    "%":remainder
};



function operate(operator, num1, num2) {

    // change number array into full numbers.
    let number_1 = Number(num1);
    let number_2 = Number(num2);

    // i need to catch the result, then push it back to num1 and return the value
    let result;
    switch (operator) {

        case "+":
            result = add(number_1,number_2);
            break;
        case "-":
            result = subtract(number_1,number_2);
            break;
        case "*":
            result = multiply(number_1,number_2);
            break;
        case "/":
            result = divide(number_1,number_2);
            break;
        case "%":
            result = remainder(number_1,number_2);
            break;
        default:
            throw new Error("Unknown operator");
    }
    updateDisplay(result);

    num1 = String(result);
    num2 = "";
    operation = "";
    
    console.log(num1);
    console.log(num2);

    finishNumber = false;



}

function handleNumbers(event) {
    // if its undefined the user must clear, not add any more numbers
    if (errorFlag) return;

    const number = event.target.dataset.value;

    displayValue += number

    console.log(displayValue);


    if (finishNumber == true) {
        num2 += number;
        displayValue = "";
    } else { // finishNumber == false
        num1 += number;
    }

    display();



}

function handleOperator() {
    if (errorFlag) return;

}

function update(target) {
    let id = target.id
    if (target.parentElement.id === "operations") {
        
        finishNumber = true;

        operation = id;
        updateDisplay(operation);

    } else if (target.parentElement.parentElement.id === "numbers") {
        if (target.id == "=") {   
            operate(operation,num1,num2);
        } else {
            checkNumber(id);
        }
    } 
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

equalsButton.addEventListener("click", operate);
clearButton.addEventListener("click", clearCalculator);