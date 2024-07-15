let firstNumStr = '';
let secondNumStr = '';
let operator = '';

const display = document.querySelector('.display');
const numberKeys = document.querySelectorAll('.number');
const mainOperations = document.querySelectorAll('.main-operation');
const equalsKey = document.querySelector('.equals');
const resetButton = document.querySelector('.reset-button');
const toggleSignButton = document.querySelector('.toggle-sign');
const percentageButton = document.querySelector('.percentage-button');
const decimelButton = document.querySelector('.decimel-button')

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
    });
});

mainOperations.forEach((btn) => {
    btn.addEventListener('click',() => {
        let selectedOperator = btn.textContent
        // ignore clicks if the first number has not been assigned
        if (firstNumStr) {
            operator = selectedOperator;
            display.textContent = ''
        } 
        if (firstNumStr && secondNumStr) {
            firstNumStr = operate(operator, parseFloat(firstNumStr), parseFloat(secondNumStr));
            secondNumStr = '';
            display.textContent = firstNumStr;
            operator = selectedOperator;
        }
    });
});

equalsKey.addEventListener('click', () => {
    if (firstNumStr && secondNumStr) {

        firstNumStr = operate(operator, parseFloat(firstNumStr), parseFloat(secondNumStr)).toString();
        secondNumStr = '';
        display.textContent = firstNumStr;
    }
});

resetButton.addEventListener('click', () => {
    firstNumStr = '';
    secondNumStr = '';
    operator = '';
    display.textContent = ''
});

toggleSignButton.addEventListener('click', () => {
    //if secondNumStr exists, means we are assigning value to it at the moment on the screen
    if (secondNumStr && secondNumStr.includes('-')) {
        secondNumStr = secondNumStr.replace('-', '');
    } else if (secondNumStr) {
        secondNumStr = '-' + secondNumStr;
    }
    // if secondNumStr doesnt exist but firstNumStr exists, means we are currently assigning to firstNumStr
    else if (firstNumStr && firstNumStr.includes('-')) {
        firstNumStr = firstNumStr.replace('-', '');
    } else if (firstNumStr) {
        firstNumStr = '-' + firstNumStr;
    }
    // if both don't exist, that means we haven't yet clicked a number key, so we don't want toggle key to have an effect

    if (secondNumStr) display.textContent = secondNumStr
    else if (firstNumStr) display.textContent = firstNumStr
});

percentageButton.addEventListener('click', () => {
    if(secondNumStr) {
        secondNumStr = (secondNumStr / 100).toString();
        display.textContent = secondNumStr;
    } else if (firstNumStr) {
        firstNumStr = (firstNumStr / 100).toString();
        display.textContent = firstNumStr;
    }
});

decimelButton.addEventListener('click', () => {
    if(secondNumStr && !(secondNumStr.includes('.'))) {
        secondNumStr = secondNumStr + '.';
        display.textContent = secondNumStr;
    } else if (firstNumStr && !(secondNumStr) && !(firstNumStr.includes('.'))) {
        firstNumStr = firstNumStr + '.';
        display.textContent = firstNumStr;
    }
})
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
