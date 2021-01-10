// Basic math operations converted to functions
function add(a,b) {
    return Number(a)+Number(b);
}
function subtract(a,b) {
    return a-b;
}
function multiply(a,b) {
    if ((a*b) % 1 === 0) {
        return a*b;
    } else {
        return (a*b).toFixed(2);
    }
}
function divide(a,b) {
    // Test for decimal to properly format response
    if (Number(b) === 0) {
        return 'ERROR';
    } else if ((a/b) % 1 === 0) {
        return a/b;
    } else {
        return (a/b).toFixed(2);
    }
}

// General function to return new calculation
function operate(a, b, operator) {
    if (operator === '+') {
        return add(a,b);
    } else if (operator === '-') {
        return subtract(a,b);
    } else if (operator === '*') {
        return multiply(a,b);
    } else if (operator === '/') {
        return divide(a,b);
    }
}

// Wipes the screen and operands/operator
function clearScreen() {
    displayReadout.textContent = '';
}

// Handles a number button click
function operandFunction(e) {
    if (errorCheck()) {return;}; // Does nothing if the screen has an error
    if (operator === '') {
        if (screenFull()) return; // Prevents adding more than max digits to the screen
        displayReadout.textContent += e.target.textContent;
    }
    else {
        if (displayReadout.textContent !== '' && secondOperand === '') {
            clearScreen()
            displayReadout.textContent = e.target.textContent;
            secondOperand = displayReadout.textContent;
        } else {
            if (screenFull()) return; // Prevents adding more than max digits to the screen
            displayReadout.textContent += e.target.textContent;
            secondOperand = displayReadout.textContent;
        }
    }
}

// Handles an operator button click
function operatorFunction(e) {
    if (errorCheck()) {return;}; // Does nothing if the screen has an error
    if (operator !== '') {
        secondOperand = displayReadout.textContent;
        let operatorHolder  = e.target.textContent; // Retains the new operator
        equalFunction(firstOperand, secondOperand, operator);
        operator = operatorHolder; // Sets the retained operator again
    } else {
        operator = e.target.textContent;
        firstOperand = displayReadout.textContent;
    }
    
}

// Handles an equal button click
function equalFunction(e) {
    if (secondOperand === '') {
        return; // This avoids wiping the skin on repeated clicks of the equal button
    }
    let result = operate(firstOperand, secondOperand, operator);
    if (result.toString().length >= 14) {
        displayReadout.textContent = 'ERROR';
    } else {
        displayReadout.textContent = result;
    }
    operator = '';
    firstOperand = displayReadout.textContent;
    secondOperand = '';
    
}

// Handles a modifier button click
function modifierFunction(e) {
    if (errorCheck()) {return;} // Does nothing if the screen has an error
    if (e.target.textContent === '.') {
        if (displayReadout.textContent.indexOf('.') === -1) {
            displayReadout.textContent += '.'
        }
    } else {
        displayReadout.textContent *= -1;
    }
    
}

function clearValues() {
    clearScreen();
    firstOperand = '';
    secondOperand = '';
    operator = '';
}

function errorCheck() {
    return (displayReadout.textContent === 'ERROR');
}

function screenFull() {
    return (displayReadout.textContent.length >= 13);
}

// Create variables to store operator and operand
let operator = '';
let firstOperand = '';
let secondOperand = '';

// Select all relevant nodes from DOM
const clearButton = document.querySelector('.clear');
const equalButton = document.querySelector('.equals');
const operatorButtons = document.querySelectorAll('.operator');
const numberButtons = document.querySelectorAll('.number');
const displayReadout = document.querySelector('.readout');
const modifierButtons = document.querySelectorAll('.modifier')

// Add event listeners to all of the buttons
numberButtons.forEach(button => {
    button.addEventListener('click', operandFunction);
});
operatorButtons.forEach(button => {
    button.addEventListener('click', operatorFunction);
});
clearButton.addEventListener('click', clearValues);
equalButton.addEventListener('click', equalFunction);
modifierButtons.forEach( button => {
    button.addEventListener('click', modifierFunction);
})