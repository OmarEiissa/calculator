let display = document.querySelector("#display");
let buttons = document.querySelectorAll("button");
let copyButton = document.querySelector(".copy-btn");
let clickSound = new Audio("../sound/mixkit-typewriter-soft-click-1125.wav");

let calculator = document.querySelector(".calculator");
let themeToggleBtn = document.querySelector(".theme-toggler");
let togglerIcon = document.querySelector(".toggler-icon");
let isDark = true;
let body = document.body;

let archivesList = document.querySelector(".archives");
let openArchivesBtn = document.querySelector(".open-archives-btn");
let closeArchivesBtn = document.querySelector(".close-archives-btn");
let clearArchiveBtn = document.querySelector(".clear-archives-btn");

let previousContent = "";

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
      previousContent = display.innerHTML || 0;

      try {
        let result = eval(display.innerHTML) || "0";
        display.innerHTML = result;
        if (isOperation(previousContent)) {
          handleSaveButtonClick(previousContent, result);
        }
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
    key === "a" ||
    key === "A" ||
    key === "ش" ||
    key === "c" ||
    key === "C" ||
    key === "ؤ" ||
    key === "T" ||
    key === "t" ||
    key === "ف"
  ) {
    playSound();
  }

  if (key === "Enter") {
    key = "equal";
  } else if (key === "Escape" || key === "Delete") {
    if (archivesList.classList.contains("visible")) {
      if (key === "Escape") {
        closeArchives(); // If Archives is open, it is closed
      } else if (key === "Delete") {
        clearArchives(); // If Archives is open, it is clear
      }
    } else {
      key = "clear"; // If it is not open, the screen is cleared
    }
  }

  let button = document.querySelector(`button[id="${key}"]`);

  if (button) {
    button.classList.add("active-key");
  }

  if (!isNaN(key) || ["+", "-", "*", "/", ".", "(", ")"].includes(key)) {
    if (
      display.innerHTML.trim() == "Error" ||
      display.innerHTML.trim() == "Clear"
    ) {
      display.innerHTML = "";
    }
    display.innerHTML += key;
  } else if (key === "equal") {
    previousContent = display.innerHTML;

    try {
      let result = eval(display.innerHTML) || "0";
      display.innerHTML = result;
      if (isOperation(previousContent)) {
        handleSaveButtonClick(previousContent, result);
      }
    } catch (error) {
      display.innerHTML = "Error";
      setTimeout(() => {
        if (display.innerHTML.trim() === "Error") {
          display.innerHTML = "";
        }
      }, 800);
    }
  } else if (key === "Backspace") {
    let string = display.innerHTML.toString();
    display.innerHTML = string.substr(0, string.length - 1);
  } else if (key === "clear") {
    display.innerHTML = "Clear";
    setTimeout(() => {
      if (display.innerHTML.trim() === "Clear") {
        display.innerHTML = "";
      }
    }, 800);
  } else if (key === "c" || key === "C" || key === "ؤ") {
    copyToClipboard();
  } else if (key === "T" || key === "t" || key === "ف") {
    themeToggle();
  } else if (key === "a" || key === "A" || key === "ش") {
    if (archivesList.classList.contains("visible")) {
      closeArchives();
    } else {
      openArchives();
    }
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
function themeToggle() {
  playSound();
  calculator.classList.toggle("dark");
  themeToggleBtn.classList.toggle("active");
  body.classList.toggle("dark");
  isDark = !isDark;
  localStorage.setItem("theme", isDark ? "dark" : "light");
}
themeToggleBtn.addEventListener("click", () => {
  themeToggle();
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

copyButton.addEventListener("click", () => {
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

// save operations in localStorage function
function saveToLocalStorage(operation, result) {
  let operations = JSON.parse(localStorage.getItem("operations")) || [];
  let operationObject = { operation: `${operation} =`, result: result };
  operations.push(operationObject);
  if (operations.length > 50) {
    operations.shift(); // Remove the oldest operation
  }
  localStorage.setItem("operations", JSON.stringify(operations));
}

// load operations from localStorage function
function loadFromLocalStorage() {
  let operations = JSON.parse(localStorage.getItem("operations")) || [];
  const operationsItem = document.querySelector(".operations-item");
  const resultsItem = document.querySelector(".results-item");
  operationsItem.innerHTML = "";
  resultsItem.innerHTML = "";

  operations.forEach((op) => {
    let operationElement = document.createElement("p");
    operationElement.className = "operation";
    operationElement.textContent = op.operation;

    // Create and append result element
    let resultElement = document.createElement("p");
    resultElement.className = "result";
    resultElement.textContent = op.result;

    operationsItem.appendChild(operationElement);
    resultsItem.appendChild(resultElement);
  });
}

// add condition for operation function
function isOperation(content) {
  const operationRegex = /[\+\-\*\/]/;
  return operationRegex.test(content);
}

// save + load LocalStorage function
function handleSaveButtonClick(operation, result) {
  saveToLocalStorage(operation, result);
  loadFromLocalStorage();
}

// clear archives list function
function clearArchives() {
  localStorage.removeItem("operations");
  loadFromLocalStorage();
  showAlert("Archives cleared");
}
// open and close archives list function
function openArchives() {
  archivesList.classList.add("visible");
}
function closeArchives() {
  archivesList.classList.remove("visible");
}
openArchivesBtn.addEventListener("click", () => {
  openArchives();
});
closeArchivesBtn.addEventListener("click", () => {
  closeArchives();
});
clearArchiveBtn.addEventListener("click", () => {
  clearArchives();
});

// Check if the click was outside the archivesList and the openArchivesBtn
document.addEventListener("click", (event) => {
  if (
    !archivesList.contains(event.target) &&
    !openArchivesBtn.contains(event.target)
  ) {
    closeArchives();
  }
});

// load operations from localStorage function at startup window
document.addEventListener("DOMContentLoaded", () => {
  // Load theme from localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    if (savedTheme === "dark") {
      calculator.classList.add("dark");
      themeToggleBtn.classList.add("active");
      body.classList.add("dark");
      isDark = true;
    } else {
      calculator.classList.remove("dark");
      themeToggleBtn.classList.remove("active");
      body.classList.remove("dark");
      isDark = false;
    }
  }

  // Load features from localStorage
  loadFromLocalStorage();
});
