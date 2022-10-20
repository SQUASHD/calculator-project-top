const DEFAULT_VALUE = "0"
const ERROR_BY_ZERO_MESSAGE = "Hey, don't do that!"

let temporaryNumberStorage = DEFAULT_VALUE;
let inputNumberB = DEFAULT_VALUE;
let firstNumberSet = false;
let secondNumberSet = false;
let decimalAlreadyPlaced = false;
let operatorSelected = false;
let computedAnswer = 0;
let currentValue = "0";

const displayContainer = document.getElementById("calculator-display")
const inputBtns = document.querySelectorAll(".input")
const mathBtns = document.querySelectorAll(".math-functions")
const clearBtn = document.getElementById("clear")
const operatorBtn = document.getElementById("equals")

// AC / Clear Button logic
clearBtn.addEventListener('click', () => {
  clearValuesAndDisplay();
  removeActiveClassFromButtons();
});

// EQUALS / = Button logic
operatorBtn.addEventListener('click', () => {
  
  if (!firstNumberSet){
    return
  }

  if (!secondNumberSet){
    inputNumberB = currentValue
    secondNumberSet = true
  }

  currentValue = operate(currentOperator, parseFloat(temporaryNumberStorage), parseFloat(inputNumberB));
  if (currentValue === ERROR_BY_ZERO_MESSAGE) {
    displayContainer.textContent = currentValue
  }
  else {
  displayContainer.textContent = Math.round(currentValue * 100) / 100;
  temporaryNumberStorage = currentValue;
}
  currentValue = "te";
  removeActiveClassFromButtons();
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
  firstNumberSet = false;
  secondNumberSet = false;
  decimalAlreadyPlaced = false;
  operatorSelected = false;
  computedAnswer = 0;
  
  resetDisplayAndCurrentValue();
}

function resetDisplayAndCurrentValue() {
  currentValue = "0";
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

// Update display based on input with verification
function updateDisplayValue(input) {
  var interpretedInputValue;

  if (currentValue === ERROR_BY_ZERO_MESSAGE) {
    resetDisplayAndCurrentValue()
  }
  if (input === 'zero' && currentValue === "0") {
    displayContainer.textContent = currentValue
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
  else if (currentValue === '0'){
    currentValue = ''
    interpretedInputValue = input
  }
  else {
    interpretedInputValue = input
  }
  
  currentValue += interpretedInputValue
  displayContainer.textContent = currentValue
}

inputBtns.forEach((button) => {
  button.addEventListener('click', e => {
    updateDisplayValue(e.target.id)
    console.log(`currentValue: ${currentValue}`)
  })
});

// Math operation button logic
mathBtns.forEach((button) => {
  button.addEventListener('click', e => {
    if (firstNumberSet) {
      currentValue = operate(currentOperator, parseFloat(temporaryNumberStorage), parseFloat(currentValue));
      displayContainer.textContent = Math.round(currentValue * 100)/100;
      temporaryNumberStorage = currentValue;
    }
    else {
      firstNumberSet = true;
    }

    temporaryNumberStorage = currentValue
    currentOperator = e.target.id

    
    resetDisplayAndCurrentValue()

    displayContainer.textContent = Math.round(temporaryNumberStorage * 100) / 100
    
    removeActiveClassFromButtons()  
    button.classList.add('active')
    logVariables()
  })
})

// Console log variables to track logic
let logVariables = () => {
  console.log(`temporaryNumberStorage: ${temporaryNumberStorage}`)
  console.log(`inputNumberB: ${inputNumberB}`)
  console.log(`currentValue: ${currentValue}`)
}