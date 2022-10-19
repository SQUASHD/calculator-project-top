const DEFAULT_INPUT_VALUE = "0"

let inputNumberA = DEFAULT_INPUT_VALUE;
let inputNumberB = DEFAULT_INPUT_VALUE;
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

clearBtn.addEventListener('click', () => {
  clearValuesAndDisplay();
  removeActiveClassFromButtons();
});

operatorBtn.addEventListener('click', () => {
  
  if (!firstNumberSet){
    return
  }

  if (!secondNumberSet){
    inputNumberB = currentValue
    secondNumberSet = true
  }

  currentValue = operate(currentOperator, parseFloat(inputNumberA), parseFloat(inputNumberB));
  displayContainer.textContent = Math.round(currentValue * 100) / 100;
  inputNumberA = currentValue;

  removeActiveClassFromButtons();
  console.log(`InputNumberA = ${inputNumberA}`)
  console.log(`InputNumberB = ${inputNumberB}`)
  console.log(`currentValue = ${currentValue}`)
});



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
  currentValue = "0";
  displayContainer.textContent = "0";
}



// Basic arithmetic operations
let add = (a, b) => a + b;
let subract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => {
  if (b === 0) {
    return 'ERROR: DIVISION BY ZERO';
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

  if (input === 'zero' && currentValue === "0") {
    displayContainer.textContent = currentValue
    return;
  }
  if (decimalAlreadyPlaced) {
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

function saveCurrentNumber(value) {
  inputNumberA = value
  firstNumberSet = true;
}

inputBtns.forEach((button) => {
  button.addEventListener('click', e => {
    updateDisplayValue(e.target.id)
    console.log(`InputNumberA: ${inputNumberA}`)
    console.log(`InputNumberB: ${inputNumberB}`)
    console.log(`currentValue = ${currentValue}`)
  })
});

mathBtns.forEach((button) => {
  button.addEventListener('click', e => {
    if (firstNumberSet) {
      currentValue = operate(currentOperator, parseFloat(inputNumberA), parseFloat(currentValue));
      displayContainer.textContent = Math.round(currentValue * 100)/100;
      inputNumberA = currentValue;
    }
    
    currentOperator = e.target.id

    saveCurrentNumber(currentValue)
    resetDisplayAndCurrentValue()

    displayContainer.textContent = Math.round(inputNumberA * 100) / 100
    
    removeActiveClassFromButtons()  
    button.classList.add('active')
  })
})