const DEFAULT_VALUE = ""
const ERROR_BY_ZERO_MESSAGE = "Hey, don't do that!"

let temporaryNumberStorage = DEFAULT_VALUE;
let inputNumberB = DEFAULT_VALUE;
let currentInputValue = DEFAULT_VALUE;
let displayValue = DEFAULT_VALUE;

let decimalAlreadyPlaced = false;
let operatorSelected = false;


const displayContainer = document.getElementById("calculator-display")
const inputBtns = document.querySelectorAll(".input")
const mathBtns = document.querySelectorAll(".math-functions")
const clearBtn = document.getElementById("clear")
const operatorBtn = document.getElementById("equals")

clearBtn.addEventListener('click', () => {
  clearValuesAndDisplay();
  removeActiveClassFromButtons();
});

operatorBtn.addEventListener('click', () => {
  logVariables()
});

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

function updateDisplayValue(input) {
  var interpretedInputValue;

  if (currentInputValue === ERROR_BY_ZERO_MESSAGE) {
    resetDisplayAndcurrentInputValue()
  }
  if (input === 'zero' && currentInputValue === "0") {
    displayContainer.textContent = currentInputValue
    return;
  }
  if (input === 'decimal' && decimalAlreadyPlaced) {
    return
  }

  if (input === 'zero') {
    interpretedInputValue = '0'
  }
  else if (input === 'decimal') {
    interpretedInputValue = "."
    decimalAlreadyPlaced = true
  }
  else if (currentInputValue === '0'){
    currentInputValue = ''
    interpretedInputValue = input
  }
  else {
    interpretedInputValue = input
  }
  
  currentInputValue += interpretedInputValue
  displayContainer.textContent = currentInputValue
}

inputBtns.forEach((button) => {
  button.addEventListener('click', e => {
    updateDisplayValue(e.target.id)
    logVariables()
  })
});

mathBtns.forEach((button) => {
  button.addEventListener('click', e => {
    
    
    logVariables()
    removeActiveClassFromButtons()
    button.classList.add('active')
  })
})

let logVariables = () => {
  console.log(`temporaryNumberStorage: ${temporaryNumberStorage}`)
  console.log(`inputNumberB: ${inputNumberB}`)
  console.log(`currentInputValue: ${currentInputValue}`)
  console.log(`displayValue: ${displayValue}`)
}