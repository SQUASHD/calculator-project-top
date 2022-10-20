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
  var interpretedInputValue;

  if(displayValue && !currentInputValue) {
    displayValue = currentInputValue
  }
  if (displayValue === ERROR_BY_ZERO_MESSAGE || temporaryNumberStorage == ERROR_BY_ZERO_MESSAGE) {
    clearValuesAndDisplay()
    return
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
    if(!operatorSelected) {
      currentOperator = e.target.id;
      operatorSelected = true;
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
    displayContainer.textContent = displayValue
    
    removeActiveClassFromButtons()
    button.classList.add('active')
    
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
  if (!temporaryNumberStorage) {
    return
  }
  if (displayValue === ERROR_BY_ZERO_MESSAGE || temporaryNumberStorage == ERROR_BY_ZERO_MESSAGE) {
    clearValuesAndDisplay()
    return
  }

  if(temporaryNumberStorage && !inputNumberB) {
    inputNumberB = currentInputValue
  }
  else if (!currentInputValue && temporaryNumberStorage && inputNumberB) {
  }
  else {
    inputNumberB = currentInputValue
  }

  temporaryNumberStorage = operate(currentOperator, parseFloat(temporaryNumberStorage), parseFloat(inputNumberB))
  removeActiveClassFromButtons()
  currentInputValue = ""
  displayValue = temporaryNumberStorage
  displayContainer.textContent = displayValue
  logVariables()
});