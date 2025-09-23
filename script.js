const display = document.querySelector("input");
const container = document.querySelector("#container");

function appendCharacter(char) {
  displayValue = display.value;
  display.value = displayValue.startsWith("0") ? char : displayValue + char;
}

const leftHandOperand = 0;
const rightHandOperand = null;
// const numbers = document.querySelectorAll(".number");

container.addEventListener("click", (event) => {
  const btnRef = event.target;
  //   const buttonTypes = ["number", "arithmetic", "fn"];
  const buttonTypes = {
    number: appendCharacter,
    arithmetic: null,
    fn: null,
  };

  const buttonType = Object.keys(buttonTypes).find((type) =>
    btnRef.classList.contains(type)
  );

  buttonTypes[buttonType](btnRef.textContent);
});
