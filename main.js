const previousOperandText = document.querySelector('#previousOperandText');
const currentOperandText = document.querySelector('#currentOperandText');
const numberKeys = document.querySelectorAll('.numberKeys');
const cancelEntryKey = document.querySelector('#cancelEntryKey');
const clearKey = document.querySelector('#clearKey');
const deleteKey = document.querySelector('#deleteKey');
const squaredKey = document.querySelector('#squaredKey');
const squareRootKey = document.querySelector('#squareRootKey');
const oneDivXKey = document.querySelector('#oneDivXKey');
const equalKey = document.querySelector('#equalKey');
const commaKey = document.querySelector('#commaKey');
const operationKeys = document.querySelectorAll('.operationKeys')
const plusOrMinusKey = document.querySelectorAll('#plusOrMinusKey')

// ------------------------------------------------------------------- //

class Calculator {
  constructor(previousOperand, currentOperand) {
    this.previousOperandText = previousOperand;
    this.currentOperandText = currentOperand;
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
    Math.pow(this.currentOperand, 2)
  }

  squareRoot() {
    Math.sqrt(this.currentOperand)
  }

  oneDivX() {
    1 / (this.currentOperand);
  }

  calculate() {
    let result;

    let pOperand = parseFloat(this.previousOperand);
    let cOperand = parseFloat(this.currentOperand);

    if (isNaN(pOperand) || isNaN(cOperand)) return;

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
    this.previousOperand = "";
    this.operation = undefined;
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

  formatDisplayNumber(number) {
    const stringNumber = number.toString();

    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];

    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }
  
  updateDisplay() {
    this.previousOperandText.innerText = `${this.formatDisplayNumber(this.previousOperand)} ${this.operation || ""}`;
    this.currentOperandText.innerText = this.formatDisplayNumber(this.currentOperand);
  }
}

const calculator = new Calculator(previousOperandText, currentOperandText);

for (const nKeys of numberKeys) {
  nKeys.addEventListener('click', () => { 
    calculator.appendNumber(nKeys.innerText); 
    calculator.updateDisplay()});
};

for (const oKeys of operationKeys) {
  oKeys.addEventListener('click', () => { 
    calculator.chooseOperation(oKeys.innerText); 
    calculator.updateDisplay()});
};

cancelEntryKey.addEventListener('click', () => { calculator.cancelEntry(); calculator.updateDisplay();});

clearKey.addEventListener('click', () => { calculator.clear(); calculator.updateDisplay();});

deleteKey.addEventListener('click', () => { calculator.delete(); calculator.updateDisplay();});

squaredKey.addEventListener('click', () => { calculator.squared(); calculator.updateDisplay();});

squareRootKey.addEventListener('click', () => { calculator.squareRoot(); calculator.updateDisplay();});

oneDivXKey.addEventListener('click', () => { calculator.oneDivX(); calculator.updateDisplay();});

equalKey.addEventListener('click', () => { calculator.calculate(); calculator.updateDisplay();});