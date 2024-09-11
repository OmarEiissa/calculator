let display = document.querySelector("#display");
let buttons = document.querySelectorAll("button");
let saveButton = document.querySelector(".save-btn");
let clickSound = new Audio("../sound/mixkit-typewriter-soft-click-1125.wav");

buttons.forEach((item) => {
  item.addEventListener("click", () => {
    playSound();

    if (item.id == "clear") {
      display.innerHTML = "Clear";
      setTimeout(() => (display.innerHTML = ""), 700);
    } else if (item.id == "backspace") {
      let string = display.innerHTML.toString();
      display.innerHTML = string.substr(0, string.length - 1);
    } else if (item.id === "equal") {
      try {
        display.innerHTML = eval(display.innerHTML) || "0";
      } catch (error) {
        display.innerHTML = "Error";
        setTimeout(() => (display.innerHTML = ""), 800);
      }
    } else {
      display.innerHTML += item.id;
    }
  });
});

// use button with keyboard function
document.addEventListener("keydown", (event) => {
  let key = event.key;

  if (
    !isNaN(key) ||
    ["+", "-", "*", "/", ".", "(", ")"].includes(key) ||
    key === "Backspace" ||
    key === "Escape" ||
    key === "Enter" ||
    key === "Delete" ||
    key === "c" ||
    key === "C" ||
    key === "ؤ"
  ) {
    playSound();
  }

  if (key === "Enter") {
    key = "equal";
  } else if (key === "Escape" || key === "Delete") {
    key = "clear";
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
      setTimeout(() => (display.innerHTML = ""), 800);
    }
  } else if (key === "Backspace") {
    let string = display.innerHTML.toString();
    display.innerHTML = string.substr(0, string.length - 1);
  } else if (key === "clear") {
    display.innerHTML = "Clear";
    setTimeout(() => (display.innerHTML = ""), 800);
  } else if (key === "c" || key === "C" || key === "ؤ") {
    copyToClipboard();
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

// Toggle dark and light mode function
let calculator = document.querySelector(".calculator");
let themeToggleBtn = document.querySelector(".theme-toggler");
let togglerIcon = document.querySelector(".toggler-icon");
let isDark = true;
let body = document.body;

themeToggleBtn.addEventListener("click", () => {
  playSound();
  calculator.classList.toggle("dark");
  themeToggleBtn.classList.toggle("active");
  body.classList.toggle("dark");
  isDark = !isDark;
});

// copy function
function copyToClipboard() {
  playSound();
  let content = display.innerHTML;

  if (navigator.clipboard) {
    if (content) {
      navigator.clipboard
        .writeText(content)
        .then(() => {
          showAlert(`Result: ${content} copied to the clipboard`);
        })
        .catch((err) => {
          showAlert("Copy failed: " + err);
        });
    } else {
      showAlert("No content to copy");
    }
  } else {
    showAlert("The Copy to Basra feature is not supported in your browser");
  }
}

saveButton.addEventListener("click", () => {
  copyToClipboard();
});

// Alert function
function showAlert(message) {
  const alertBox = document.getElementById("custom-alert");
  alertBox.textContent = message;
  alertBox.classList.remove("hidden");

  setTimeout(() => {
    alertBox.classList.add("show");
  }, 10);

  setTimeout(() => {
    alertBox.classList.remove("show");
    setTimeout(() => {
      alertBox.classList.add("hidden");
    }, 500);
  }, 1500);
}

// sound effect function
function playSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}
