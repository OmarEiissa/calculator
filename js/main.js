let display = document.querySelector("#display");
let buttons = document.querySelectorAll("button");

buttons.forEach((item) => {
  item.onclick = () => {
    if (item.id == "clear") {
      display.innerHTML = "";
    } else if (item.id == "backspace") {
      let string = display.innerHTML.toString();
      display.innerHTML = string.substr(0, string.length - 1);
    } else if (display.innerHTML != "" && item.id == "equal") {
      display.innerHTML = eval(display.innerHTML);
    } else if (display.innerHTML == "" && item.id == "equal") {
      display.innerHTML = "Empty";
      setTimeout(() => (display.innerHTML = ""), 2000);
    } else {
      display.innerHTML += item.id;
    }
  };
});

let calculator = document.querySelector(".calculator");
let themeToggleBtn = document.querySelector(".theme-toggler");
let togglerIcon = document.querySelector(".toggler-icon");
let isDark = true;
let body = document.body;

themeToggleBtn.onclick = () => {
  calculator.classList.toggle("dark");
  themeToggleBtn.classList.toggle("active");
  body.classList.toggle("dark");
  isDark = !isDark;
  // isDark = false
};
