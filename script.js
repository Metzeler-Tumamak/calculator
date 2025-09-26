const display = document.querySelector("input");
const container = document.querySelector("#container");

let total = null;
let currentBtn = null;
let currentBtnType = null;

function processArithmethic(a, operator, b) {
  a = Number(a);
  b = Number(b);

  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
    case "%":
      return a % b;
  }
}

function getButtonType(btn) {
  switch (true) {
    case btn.classList.contains("number"):
      return "number";
    case btn.classList.contains("arithmetic"):
      return "arithmetic";
    case btn.classList.contains("clear"):
      return "clear";
    case btn.classList.contains("backspace"):
      return "backspace";
  }
}

function appendChar(char) {
  let displayValue = display.value + char;

  const operandRegExp = /\d+\.{0,1}\d*/g;
  const operatorRegExp = /[+\-*/%]/;

  const displayValueArr = displayValue.match(operandRegExp);

  const lessThanOneFloat = /^\d+\./;

  if (displayValueArr.length > 1) {
    display.value = displayValueArr
      .map((elem) =>
        lessThanOneFloat.test(elem) ? elem : Number(elem).toString()
      )
      .join(` ${displayValue.match(operatorRegExp)[0]} `);
  } else {
    display.value = lessThanOneFloat.test(displayValueArr[0])
      ? displayValueArr[0]
      : String(Number(displayValueArr[0]));
  }
}

function operate(operator) {
  let displayValue = display.value;
  const expressionRegExp = /(\d+\.*\d*)\s([+\-*/%])\s(\d+\.*\d*)/;
  const expression = displayValue.match(expressionRegExp);

  if (expression) {
    total = processArithmethic(...expression.slice(1));
    total = Number.isFinite(total) ? total.toFixed(10) : "That is not allowed";
    displayValue = total;
  }

  display.value = operator === "=" ? total : `${displayValue} ${operator} 0`;
}

function clearDisplay() {
  display.value = "0";
  total = null;
}

function deleteChar() {
  const lastChar = display.value.at(-1);

  if (lastChar === " ") {
    const operandRegExp = /\d+\.{0,1}\d*/g;

    display.value = display.value.match(operandRegExp)[0];
  } else {
    display.value = display.value.slice(0, -1);
  }
}
container.addEventListener("click", (event) => {
  const buttonTypes = {
    number: appendChar,
    arithmetic: operate,
    clear: clearDisplay,
    backspace: deleteChar,
  };
  currentBtn = event.target;
  currentBtnType = getButtonType(currentBtn);
  buttonTypes[currentBtnType](currentBtn.textContent);
});
