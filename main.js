const previousOperandText = document.querySelector('#previousOperand>h3');
const currentOperandText = document.querySelector('#currentOperand>h3');
const numberKeys = document.querySelectorAll('.numberKeys');
const cancelEntryKey = document.querySelector('#cancelEntryKey');
const clearKey = document.querySelector('#clearKey');
const deleteKey = document.querySelector('#deleteKey');
const squaredKey = document.querySelector('#squaredKey');
const squareRootKey = document.querySelector('#squareRootKey');
const oneDivXKey = document.querySelector('#oneDivXKey');
const divisionKey = document.querySelector('#divisionKey');
const plusKey = document.querySelector('#plusKey');
const minusKey = document.querySelector('#minusKey');
const timesKey = document.querySelector('#timesKey');
const equalKey = document.querySelector('#equalKey');
const commaKey = document.querySelector('#commaKey');
const operationKeys = document.querySelectorAll('.operationKeys')

// ------------------------------------------------------------------- //

class Calculator {
  constructor(previousOperand, currentOperand) {
    this.previousOperand = previousOperand;
    this.currentOperand = currentOperand;
    this.clear();
  }

  cancelEntry() {
    return this.operation = undefined;
  }

  clear() {
    this.previousOperand = ''
    this.currentOperand = ''
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  squared() {
    return Math.pow(this.currentOperand, 2)
  }

  squareRoot() {
    return Math.sqrt(this.currentOperand)
  }

  oneDivX() {
    return 1 / (this.currentOperand);
  }

  calculate() {
    let result;

    let pOperand = parseFloat(this.previousOperand);
    let cOperand = parseFloat(this.currentOperand);

    if (NaN(pOperand) || NaN(cOperand)) return;

    switch(this.operation) {
      case "+":
        result = pOperand + cOperand;
        break;
      case "-":
        result = pOperand - cOperand;
        break;
      case "/":
        result = pOperand / cOperand;
        break;
      case "*":
        result = pOperand * cOperand;
        break;
      default: return;
    }

    this.currentOperand = result;
    this.previousOperand = '';
    this.operation = "";
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") { this.calculate() }

    this.operation = operation;

    // When the operator be setted, the currentOperand will be blank
    this.previousOperand = this.currentOperand;
    this.currentOperand = ''
  }

  appendNumber(number) {
    if (this.currentOperand.includes('.') && number === '.') return;
    this.currentOperand = `${this.currentOperand}${number.toString()}`;
  }

  //updateDisplay() {}

  //formatDisplayNumber() {}
}

const calculator = new Calculator(previousOperandText, currentOperandText);

for (const nKeys of numberKeys) {
  numberKeys.addEventListener('click', () => {
    calculator.appendNumber(nKeys.innerText);
  })
}

for (const oKeys of operationKeys) {
  operationKeys.addEventListener('click', () => {
    calculator.chooseOperation(oKeys.innerText);
  })
}

cancelEntryKey.addEventListener('click', () => {
  calculator.cancelEntry();
})

clearKey.addEventListener('click', () => {
  calculator.clear();
})

deleteKey.addEventListener('click', () => {
  calculator.delete();
})

squaredKey.addEventListener('click', () => {
  calculator.squared();
})

squareRootKey.addEventListener('click', () => {
  calculator.squareRoot();
})

oneDivXKey.addEventListener('click', () => {
  calculator.oneDivXKey();
})

equalKey.addEventListener('click', () => {
  calculator.calculate();
})