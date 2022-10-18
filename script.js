const DEFAULT_INPUT_VALUE = ""

let inputNumberA = DEFAULT_INPUT_VALUE;
let inputNumberB = DEFAULT_INPUT_VALUE;
let firstNumberSet = false;
let secondNumberSet = false;
let decimalAlreadyPlaced = false;
let operatorSelected = false;
let computedAnswer = 0;
let lastManualInput = 0;

let currentValue = "";

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
  
  if (!firstNumberSet){
    return
  }

  inputNumberB = currentValue
  computedAnswer = operate(currentOperator, parseFloat(inputNumberA), parseFloat(inputNumberB));
  displayContainer.textContent = computedAnswer;
  inputNumberA = computedAnswer;
  removeActiveClassFromButtons();
})

function removeActiveClassFromButtons() {
  mathBtns.forEach((button) => {
    button.classList.remove('active');
  });
}

function clearValuesAndDisplay() {
  inputNumberA = DEFAULT_INPUT_VALUE;
  inputNumberB = DEFAULT_INPUT_VALUE;
  firstNumberSet = false;
  secondNumberSet = false;
  decimalAlreadyPlaced = false;
  operatorSelected = false;
  computedAnswer = 0;
  
  resetDisplayAndCurrentValue();
}

function resetDisplayAndCurrentValue() {
  currentValue = "";
  displayContainer.textContent = "0";
}



// Basic arithmetic operations
let add = (a, b) => a + b;
let subract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;

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

function updatecurrentValue(input) {
  var interpretedInputValue;

  if (input === 'zero' && currentValue === "0") {
    return;
  }
  if (input === 'decimal' && decimalAlreadyPlaced) {
    return
  }

  if (input === 'zero') {
    interpretedInputValue = '0'
  }
  else if (input === 'decimal') {
    if (currentValue === "" || currentValue === "0") {
      currentValue = "0"
    }
    interpretedInputValue = "."
    decimalAlreadyPlaced = true
  }
  else {
    interpretedInputValue = input
  }
  
  currentValue += interpretedInputValue
  displayContainer.textContent = currentValue
}

function saveCurrentNumber(value) {
  if (firstNumberSet) {
    inputNumberB = value;
    secondNumberSet = true;
  }
  else {
    inputNumberA = value
    firstNumberSet = true;
  }
}

inputBtns.forEach((button) => {
  button.addEventListener('click', e => {
    updatecurrentValue(e.target.id)
  })
});

mathBtns.forEach((button) => {
  button.addEventListener('click', e => {
    currentOperator = e.target.id

    if (!firstNumberSet) {
      saveCurrentNumber(currentValue)
      resetDisplayAndCurrentValue()
      displayContainer.textContent = inputNumberA
    }

    if (!operatorSelected) {
      button.classList.add('active');
      operatorSelected = true;
    }
    else {
      removeActiveClassFromButtons()
      button.classList.add('active')
    }
    
    
  })
})