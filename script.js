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
            display.textContent = '0';
        } 
        if (firstNumStr && secondNumStr) {
            if (operator == '/' && secondNumStr == '0') {
                alert("Zero division error, resetting the calculator");
                setTimeout(resetCalculator, 1000);
                return;
            }
            firstNumStr = operate(operator, parseFloat(firstNumStr), parseFloat(secondNumStr));
            secondNumStr = '';
            if (firstNumStr.length > 16) firstNumStr = (parseFloat(firstNumStr).toPrecision(16)).toString();
            display.textContent = firstNumStr;
            operator = selectedOperator;
        }
    });
});

equalsKey.addEventListener('click', () => {
    if (firstNumStr && secondNumStr) {
        if (operator == '/' && secondNumStr == '0') {
            alert("Zero division error, resetting the calculator");
            setTimeout(resetCalculator, 1000);
            return
        }
        firstNumStr = operate(operator, parseFloat(firstNumStr), parseFloat(secondNumStr)).toString();
        secondNumStr = '';
        if (firstNumStr.length > 16) firstNumStr = (parseFloat(firstNumStr).toPrecision(16)).toString();
        display.textContent = firstNumStr;
    }
});

resetButton.addEventListener('click', resetCalculator);

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
    //if we are assigning secondNumStr and the user has already pressed a num key
    if(secondNumStr && !(secondNumStr.includes('.'))) {
        secondNumStr = secondNumStr + '.';
        display.textContent = secondNumStr;
    } 
    // if we are assigning firstNumStr and the user has already pressed a num key
    else if (firstNumStr && !(secondNumStr) && !(firstNumStr.includes('.'))) {
        firstNumStr = firstNumStr + '.';
        display.textContent = firstNumStr;
    }
    // if we are assigning secondNumStr and the user has not yet pressed a num key  
    else if (firstNumStr && !(secondNumStr) && display.textContent === '0') {
        secondNumStr = '0.';
        display.textContent = secondNumStr;
    }
    // if we are assigning firstNumStr and the user has not yet pressed a num key 
    else if (!(firstNumStr)) {
        firstNumStr = '0.';
        display.textContent = firstNumStr;
    }
});

function resetCalculator() {
    firstNumStr = '';
    secondNumStr = '';
    operator = '';
    display.textContent = '0';
}
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
