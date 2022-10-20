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
  removeActiveClassFromButtons
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

let resetIfDivideByZeroError = () => {
  if (temporaryNumberStorage === ERROR_BY_ZERO_MESSAGE || displayValue === ERROR_BY_ZERO_MESSAGE) {
    clearValuesAndDisplay()
    removeActiveClassFromButtons()
  }
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
  resetIfDivideByZeroError()
  var interpretedInputValue;

  if(displayValue && !currentInputValue) {
    displayValue = currentInputValue
  }
  if (buttonInput === 'zero' && currentInputValue === "0") {
    displayContainer.textContent = Math.round(currentInputValue * 100) / 100
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
  displayContainer.textContent = Math.round(currentInputValue * 100) / 100
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
    decimalAlreadyPlaced = false;
    removeActiveClassFromButtons()
    button.classList.add('active')

    resetIfDivideByZeroError()

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
    displayContainer.textContent = Math.round(displayValue * 100) / 100
    
    
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
  resetIfDivideByZeroError()

  if (!temporaryNumberStorage) {
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
  displayContainer.textContent = Math.round(displayValue * 100) / 100
  logVariables()
});

signChangeBtn.addEventListener('click', () => {
  resetIfDivideByZeroError()

  if (currentInputValue) {
    currentInputValue *= -1
    displayContainer.textContent = Math.round(currentInputValue * 100) / 100
  } else if (!currentInputValue && displayValue) {
    displayValue *= -1
    temporaryNumberStorage = displayValue
    displayContainer.textContent = Math.round(displayValue * 100) / 100
  }
  logVariables()
})

percentBtn.addEventListener('click', () => {
  resetIfDivideByZeroError()

  if (currentInputValue) {
    currentInputValue /= 100
    displayContainer.textContent = Math.round(currentInputValue * 100) / 100
  }
  else if (!currentInputValue && displayValue) {
    displayValue /= 100
    temporaryNumberStorage = displayValue
    displayContainer.textContent = Math.round(displayValue * 100) / 100
  }
})


// Hover active styling for buttons
inputBtns.forEach((button) => {
  button.addEventListener('mouseover', e => {
    e.target.classList.add("active-input")
  })
  button.addEventListener('mouseout', e => {
    e.target.classList.remove('active-input')
  })
})

clearBtn.addEventListener('mouseover', () => {
  clearBtn.classList.add('active-extra')
})
clearBtn.addEventListener('mouseout', () => {
  clearBtn.classList.remove('active-extra')
})

signChangeBtn.addEventListener('mouseover', () => {
  signChangeBtn.classList.add('active-extra')
})
signChangeBtn.addEventListener('mouseout', () => {
  signChangeBtn.classList.remove('active-extra')
})

percentBtn.addEventListener('mouseover', () => {
  percentBtn.classList.add('active-extra')
})
percentBtn.addEventListener('mouseout', () => {
  percentBtn.classList.remove('active-extra')
})