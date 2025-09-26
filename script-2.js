const display = document.querySelector("input");
const container = document.querySelector("#container");

let total = null;
let lastBtn = null;
let lastBtnType = null;
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
  }
}

function getButtonType(btn) {
  switch (true) {
    case btn.classList.contains("number"):
      return "number";
    case btn.classList.contains("arithmetic"):
      return "arithmetic";
    case btn.classList.contains("equals"):
      return "equals";
  }
}

// function appendChar(char) {
//   displayValue = display.value;

//   if (currentBtnType === "number") {
//     if (char === ".") {
//       const isLeftHandOperand = !/[+\-*/]/.test(displayValue);

//       if (isLeftHandOperand) {
//         if (displayValue.includes(".")) return;
//       } else {
//         if (displayValue.split(/\s[+\-*/]/)[1].includes(".")) {
//           return;
//         }
//       }
//     }

//     displayValue += char;

//     // const regExp = /^0\./;
//     // if (displayValue.startsWith("0") && !regExp.test(displayValue)) {
//     //   display.value = char;
//     // } else {
//     //   display.value = displayValue;
//     // }
//     // let regExp = /^0\./;

//     // if (displayValue.startsWith("0") && !regExp.test(displayValue)) {
//     //   display.value = char;
//     // } else {
//     //     regExp = /\.$/;
//     //     display.value = displayValue.replace(regExp, "0.");

//     //   display.value = displayValue;
//     // }

//     let regExp = /^0\./;
//     if (isLeftHandOperand) {
//       if (!regExp.test(displayValue)) {
//         display.value = String(Number(displayValue));
//       }
//     } else {
//       const expressionArr = displayValue.test;
//     }
//   }

//   if (currentBtnType === "arithmetic") {
//     const expression = displayValue.match(
//       /(\d+\.*\d*)\s([+\-*/])\s(\d+\.*\d*)/
//     );
//     console.table(expression);

//     if (expression) {
//       total = processArithmethic(...expression.slice(1));
//       displayValue = total;
//     }
//     display.value = char === "=" ? total : `${displayValue} ${char} 0`;
//   }

//   lastBtn = currentBtn;
//   lastBtnType = currentBtnType;
// }

function appendChar(char) {
  if (currentBtnType === "number") {
    let displayValue = display.value + char;

    const operandRegExp = /\d+\.{0,1}\d*/g;
    const operatorRegExp = /[+\-*/]/;

    const displayValueArr = displayValue.match(operandRegExp);

    const lessThanOneFloat = /^0\./;

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

  if (currentBtnType === "arithmetic") {
    operate(char);
  }
}

function operate(operator) {
  let displayValue = display.value;
  const expressionRegExp = /(\d+\.*\d*)\s([+\-*/])\s(\d+\.*\d*)/;
  const expression = displayValue.match(expressionRegExp);

  if (expression) {
    total = processArithmethic(...expression.slice(1));
    displayValue = total;
  }

  display.value = operator === "=" ? total : `${displayValue} ${operator} 0`;
}

container.addEventListener("click", (event) => {
  currentBtn = event.target;
  currentBtnType = getButtonType(currentBtn);
  appendChar(currentBtn.textContent);
});
