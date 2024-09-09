let display = document.querySelector("#display");
let buttons = document.querySelectorAll("button");
let clickSound = new Audio("../sound/mixkit-typewriter-soft-click-1125.wav");

buttons.forEach((item) => {
  item.addEventListener("click", () => {
    clickSound.currentTime = 0;
    clickSound.play();

    if (item.id == "clear") {
      display.innerHTML = "Clear";
      setTimeout(() => (display.innerHTML = ""), 800);
    } else if (item.id == "backspace") {
      let string = display.innerHTML.toString();
      display.innerHTML = string.substr(0, string.length - 1);
    } else if (item.id === "equal") {
      try {
        display.innerHTML = eval(display.innerHTML) || "0";
      } catch (error) {
        display.innerHTML = "Error";
        setTimeout(() => (display.innerHTML = ""), 2000);
      }
    } else {
      display.innerHTML += item.id;
    }
  });
});

let memory = 0;

document.addEventListener("keydown", (event) => {
  let key = event.key;
  if (
    !isNaN(key) ||
    ["+", "-", "*", "/", ".", "(", ")"].includes(key) ||
    key === "Backspace" ||
    key === "Escape" ||
    key === "Enter" ||
    key === "Delete"
  ) {
    clickSound.currentTime = 0;
    clickSound.play();
  }

  if (key === "Enter") {
    key = "equal";
  } else if (key === "Escape" || key === "Delete") {
    key = "clear";
  }

  if (key === "m") {
    memory = eval(display.innerHTML); // حفظ النتيجة في الذاكرة
  } else if (key === "r") {
    display.innerHTML = memory; // استرجاع النتيجة من الذاكرة
  }

  let button = document.querySelector(`button[id="${key}"]`);

  if (button) {
    button.classList.add("active-key");
  }

  if (!isNaN(key) || ["+", "-", "*", "/", ".", "(", ")"].includes(key)) {
    display.innerHTML += key;
  } else if (key === "equal") {
    try {
      display.innerHTML = eval(display.innerHTML) || "0";
    } catch (error) {
      display.innerHTML = "Error";
      setTimeout(() => (display.innerHTML = ""), 2000);
    }
  } else if (key === "Backspace") {
    let string = display.innerHTML.toString();
    display.innerHTML = string.substr(0, string.length - 1);
  } else if (key === "clear") {
    display.innerHTML = "Clear";
    setTimeout(() => (display.innerHTML = ""), 800);
  }
});

document.addEventListener("keyup", (event) => {
  let key = event.key;

  if (key === "Enter") {
    key = "equal";
  } else if (key === "Escape" || key === "Delete") {
    key = "clear";
  }

  let button = document.querySelector(`button[id="${key}"]`);

  if (button) {
    button.classList.remove("active-key");
  }
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
};
