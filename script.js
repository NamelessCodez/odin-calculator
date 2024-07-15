let firstNumStr = '';
let secondNumStr = '';
let operator = '';

const display = document.querySelector('.display');
const numberKeys = document.querySelectorAll('.number');
const mainOperations = document.querySelectorAll('.main-operation');
const equalsKey = document.querySelector('.equals');
const resetButton = document.querySelector('.reset-button');
const toggleSignButton = document.querySelector('.toggle-sign');

numberKeys.forEach((btn) => {
    btn.addEventListener('click', () => {
        let numClicked = btn.textContent;
        // if operator exists first number has already been assigned, so now take the second number
        if (operator) {
            secondNumStr += numClicked;
            display.textContent = secondNumStr;
        }
        // if oper
        else {
            firstNumStr += numClicked;
            display.textContent = firstNumStr;
        }
        console.log(firstNumStr);
        console.log(secondNumStr);
    });
});

mainOperations.forEach((btn) => {
    btn.addEventListener('click',() => {
        let selectedOperator = btn.textContent
        // ignore clicks if the first number has not been assigned
        if (firstNumStr) {
            operator = selectedOperator;
            display.textContent = 0;
        } 
        if (firstNumStr && secondNumStr) {
            firstNumStr = operate(operator, parseInt(firstNumStr), parseInt(secondNumStr));
            secondNumStr = '';
            display.textContent = firstNumStr;
            operator = selectedOperator;
        }
    });
});

equalsKey.addEventListener('click', () => {
    if (firstNumStr && secondNumStr) {
        firstNumStr = operate(operator, parseInt(firstNumStr), parseInt(secondNumStr)).toString();
        secondNumStr = '';
        display.textContent = firstNumStr;
    }
});

resetButton.addEventListener('click', () => {
    firstNumStr = '';
    secondNumStr = '';
    operator = '';
    display.textContent = 0;
});

toggleSignButton.addEventListener('click', () => {
    if (secondNumStr && secondNumStr.includes('-')) {
        secondNumStr = secondNumStr.replace('-', '');
    } else if (secondNumStr) {
        secondNumStr = '-' + secondNumStr;
    } else if (firstNumStr && firstNumStr.includes('-')) {
        firstNumStr = firstNumStr.replace('-', '');
    } else if (firstNumStr) {
        firstNumStr = '-' + firstNumStr;
    }

    if (secondNumStr) display.textContent = secondNumStr
    else if (firstNumStr) display.textContent = firstNumStr
});
function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}

function operate (operator, a, b) {
    switch (operator) {
        case '+':
            return add(a,b);
        case '-':
            return subtract(a,b);
        case '*':
            return multiply(a,b);
        case '/':
            return divide(a,b);
    }
}
