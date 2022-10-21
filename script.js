const DEFAULT_VALUE = ""
const ERROR_BY_ZERO_MESSAGE = "Hey, don't do that!"

let temporaryNumberStorage = DEFAULT_VALUE;
let inputNumberB = DEFAULT_VALUE;
let currentInputValue = DEFAULT_VALUE;
let displayValue = DEFAULT_VALUE;

let decimalAlreadyPlaced = false;
let operatorSelected = false;
let currentOperator = ""
let lastOperator = ""

const displayContainer = document.getElementById("calculator-display")
const inputBtns = document.querySelectorAll(".input")
const mathBtns = document.querySelectorAll(".math-functions")
const clearBtn = document.getElementById("clear")
const operatorBtn = document.getElementById("equals")
const signChangeBtn = document.getElementById("changeSign")
const percentBtn = document.getElementById('calculatePercent')

function removeActiveClassFromButtons() {
  mathBtns.forEach((button) => {
    button.classList.remove('active');
  });
}

function clearValuesAndDisplay() {
  temporaryNumberStorage = DEFAULT_VALUE;
  inputNumberB = DEFAULT_VALUE;
  currentInputValue = DEFAULT_VALUE;
  displayValue = DEFAULT_VALUE;

  decimalAlreadyPlaced = false;
  operatorSelected = false;
  currentOperator = ""
  lastOperator = ""
  
  resetDisplayAndcurrentInputValue();
}

function resetDisplayAndcurrentInputValue() {
  displayValue = DEFAULT_VALUE;
  displayContainer.textContent = "0";
  removeActiveClassFromButtons()
}

// Basic arithmetic operations
let add = (a, b) => a + b;
let subract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => {
  if (b === 0) {
    return ERROR_BY_ZERO_MESSAGE;
  }
  return a / b;
};

let checkIfDivideByZeroError = () => {
  if (temporaryNumberStorage === ERROR_BY_ZERO_MESSAGE || displayValue === ERROR_BY_ZERO_MESSAGE) {
    return true;
  }
  else {
    return false;
  }
}

let resetCalculator = () => {
  clearValuesAndDisplay()
  removeActiveClassFromButtons()
  return;
}


let operate = (operator, firstNumber, secondNumber) => {
  if(operator === 'add') {
    return add(firstNumber, secondNumber)
  }
  else if (operator === 'subtract') {
    return subract(firstNumber, secondNumber)
  }
  else if (operator === 'multiply') {
    return multiply(firstNumber, secondNumber)
  }
  else if (operator === 'divide') {
    return divide(firstNumber, secondNumber)
  }
};

function updateDisplayValue(buttonInput) {
  if (checkIfDivideByZeroError()) {
    resetCalculator()
  }
  var interpretedInputValue;

  if(displayValue && !currentInputValue) {
    displayValue = currentInputValue
  }
  if (buttonInput === 'zero' && currentInputValue === "0") {
    displayContainer.textContent = currentInputValue
    return;
  }
  if (buttonInput === 'decimal' && decimalAlreadyPlaced) {
    return
  }

  if (buttonInput === 'zero') {
    interpretedInputValue = '0'
  }
  else if (buttonInput === 'decimal') {
    if (!currentInputValue) {
      currentInputValue = "0"
    }
    interpretedInputValue = "."
    decimalAlreadyPlaced = true
  }
  else if (currentInputValue === '0'){
    currentInputValue = ''
    interpretedInputValue = buttonInput
  }
  else {
    interpretedInputValue = buttonInput
  }
  
  currentInputValue += interpretedInputValue
  displayContainer.textContent = currentInputValue
}

let logVariables = () => {
  console.log(`temporaryNumberStorage: ${temporaryNumberStorage}`)
  console.log(`inputNumberB: ${inputNumberB}`)
  console.log(`currentInputValue: ${currentInputValue}`)
  console.log(`displayValue: ${displayValue}`)
  console.log(`currentOperator: ${currentOperator}`)
  console.log(`lastOperator: ${lastOperator}`)
}

// Input button logic
inputBtns.forEach((button) => {
  button.addEventListener('click', e => {
    updateDisplayValue(e.target.id)
    logVariables()
  })
});

// Math operation button logic
mathBtns.forEach((button) => {
  button.addEventListener('click', e => {
    if (checkIfDivideByZeroError()) {
      resetCalculator()
    }
    decimalAlreadyPlaced = false;
    removeActiveClassFromButtons()
    button.classList.add('active')


    if(!operatorSelected) {
      currentOperator = e.target.id;
      operatorSelected = true;
    }
    else if (temporaryNumberStorage && !currentInputValue) {
      currentOperator = e.target.id;
      return;
    }
    else {
      lastOperator = currentOperator
      currentOperator = e.target.id
    }

    if (!temporaryNumberStorage && !currentInputValue) {
      temporaryNumberStorage = "0"
      displayValue = "0"
    }
    else if (!temporaryNumberStorage) {
      temporaryNumberStorage = currentInputValue
      displayValue = currentInputValue
    }
    else if (temporaryNumberStorage && inputNumberB && !currentInputValue && displayValue) {
      inputNumberB = ""
      currentOperator = e.target.id
    }
    else {
      inputNumberB = currentInputValue
      temporaryNumberStorage = operate(lastOperator, parseFloat(temporaryNumberStorage), parseFloat(inputNumberB))
      displayValue = temporaryNumberStorage
    }

    currentInputValue = ""
    if (displayValue === ERROR_BY_ZERO_MESSAGE) {
      displayContainer.textContent = displayValue
    }
    else {
      displayContainer.textContent = Math.round(displayValue * 10000) / 10000
    }
    
    logVariables()
  })
})

// AC / Clear button logic
clearBtn.addEventListener('click', () => {
  clearValuesAndDisplay();
  removeActiveClassFromButtons();
});

// Equals / = button logic
operatorBtn.addEventListener('click', () => {
  if (checkIfDivideByZeroError()) {
      resetCalculator()
    }

  if (!temporaryNumberStorage && temporaryNumberStorage != 0) {
    return
  }

  if(temporaryNumberStorage && !inputNumberB) {
    inputNumberB = currentInputValue
  }
  else if (currentInputValue) {
    inputNumberB = currentInputValue
  }

  temporaryNumberStorage = operate(currentOperator, parseFloat(temporaryNumberStorage), parseFloat(inputNumberB))
  currentInputValue = ""
  displayValue = temporaryNumberStorage
  
  if (displayValue === ERROR_BY_ZERO_MESSAGE) {
    displayContainer.textContent = displayValue
  }
  else {
    displayContainer.textContent = Math.round(displayValue * 10000) / 10000
  }
  
  removeActiveClassFromButtons()
  logVariables()
});

signChangeBtn.addEventListener('click', () => {
  if (checkIfDivideByZeroError()) {
      resetCalculator()
    }

  if (currentInputValue) {
    currentInputValue *= -1
    displayContainer.textContent = Math.round(currentInputValue * 10000) / 10000
  } else if (!currentInputValue && displayValue) {
    displayValue *= -1
    temporaryNumberStorage = displayValue
    displayContainer.textContent = Math.round(displayValue * 10000) / 10000
  }
  logVariables()
})

percentBtn.addEventListener('click', () => {
  if (checkIfDivideByZeroError()) {
      resetCalculator()
    }

  if (currentInputValue) {
    currentInputValue /= 100
    displayContainer.textContent = Math.round(currentInputValue * 10000) / 10000
  }
  else if (!currentInputValue && displayValue) {
    displayValue /= 100
    temporaryNumberStorage = displayValue
    displayContainer.textContent = Math.round(displayValue * 10000) / 10000
  }
})