const display = document.querySelector("input");
const container = document.querySelector("#container");

let total = 0;
let leftHandOperand = 0;
let rightHandOperand = 0;
let clearDisplay = false;
let lastOperation = null;
let repeatingValue = null;
let activeOperator = null;

function appendCharacter(char) {
  // if (clearDisplay) {
  //   display.value = "";
  //   clearDisplay = false;
  // }
  if (activeOperator) {
    display.value = "";
    activeOperator.classList.toggle("active");
  }
  displayValue = display.value;
  display.value = displayValue.startsWith("0") ? char : displayValue + char;
  rightHandOperand = Number(display.value);
}

function processArithmetic(operator) {
  // if (activeOperator === null) {
  //   return;
  // }

  if (!lastOperation) {
    lastOperation = operator;
  }

  switch (lastOperation) {
    case "+":
      total = leftHandOperand + rightHandOperand;
      break;
    case "-":
      total = leftHandOperand - rightHandOperand;
      break;
  }
  leftHandOperand = total;
  display.value = total.toString();
  lastOperation = operator;
}

function equalsOperation() {
  if (!lastOperation) return;
  processArithmetic(lastOperation);
  activeOperator.classList.remove("active");
}

container.addEventListener("click", (event) => {
  const btnRef = event.target;
  const buttonTypes = {
    number: appendCharacter,
    arithmetic: processArithmetic,
    equals: equalsOperation,
    fn: null,
  };

  const buttonType = Object.keys(buttonTypes).find((type) =>
    btnRef.classList.contains(type)
  );

  if (buttonType === "arithmetic") {
    activeOperator = document.querySelector(".arithmetic.active");

    if (activeOperator && activeOperator !== btnRef) {
      activeOperator.classList.toggle("active");
    }

    btnRef.classList.toggle("active");
    activeOperator = btnRef;
  }

  buttonTypes[buttonType](btnRef.textContent);
});
