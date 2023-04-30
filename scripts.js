const overlay = document.getElementById("overlay");
const accentColourInput = document.getElementById("accent-colour-input");
const backgroundColourInput = document.getElementById(
  "background-colour-input"
);
const controlsColourInput = document.getElementById("controls-colour-input");
const headerColourInput = document.getElementById("header-colour-input");
const menuColourInput = document.getElementById("menu-colour-input");
const tablePrimaryColourInput = document.getElementById(
  "table-primary-colour-input"
);
const tableSecondaryColourInput = document.getElementById(
  "table-secondary-colour-input"
);
const textColourInput = document.getElementById("text-colour-input");
const trackerColourInput = document.getElementById("tracker-colour-input");
const resetButton = document.getElementById("reset-button");
const selectAllCheckbox = document.getElementById("select-all-checkbox");
const selectCheckboxes = document.getElementsByClassName("select-checkbox");
const bookTitleText = document.getElementById("book-title-text");
const bookAuthorText = document.getElementById("book-author-text");
const deleteBookMenu = document.getElementById("delete-book-menu");
const deleteBookMenuContinueButton = document.getElementById(
  "delete-book-menu-continue-button"
);

const menuItems = [
  { buttonID: "settings-button", menuID: "settings-menu" },
  { buttonID: "restore-button", menuID: "restore-menu" },
  {
    buttonID: "delete-selected-books-button",
    menuID: "delete-selected-books-menu",
  },
  { buttonID: "deleted-books-button", menuID: "deleted-books-menu" },
  { buttonID: "add-book-button", menuID: "add-book-menu" },
];

const defaultColours = {
  "accent-colour": "#e3b464",
  "background-colour": "#393646",
  "controls-colour": "#393646",
  "header-colour": "#4f4557",
  "menu-colour": "#4f4557",
  "table-primary-colour": "#4f4557",
  "table-secondary-colour": "#393646",
  "text-colour": "#ffffff",
  "tracker-colour": "#4f4557",
};

let selectedRow;

menuItems.forEach(({ buttonID, menuID }) => {
  addEventListenerToButton(buttonID, () => {
    toggleMenu(document.getElementById(menuID));
  });
});

function addEventListenerToButton(buttonID, callback) {
  const button = document.getElementById(buttonID);
  button.addEventListener("click", callback);
}

document.querySelectorAll(".close-button").forEach((closeButton) => {
  closeButton.addEventListener("click", () => {
    const parentMenu = closeButton.closest(".menu");
    if (parentMenu.classList.contains("active")) {
      toggleMenu(parentMenu);
    }
  });
});

function addToggleMenuListeners(selector, menuId) {
  document.querySelectorAll(selector).forEach((button) => {
    button.addEventListener("click", () => {
      toggleMenu(document.getElementById(menuId));
    });
  });
}

function toggleMenu(menu) {
  const isActive = !menu.classList.contains("active");
  overlay.classList[isActive ? "add" : "remove"]("active");
  overlay.classList[isActive ? "remove" : "add"]("inactive");
  menu.classList[isActive ? "add" : "remove"]("active");
  menu.classList[isActive ? "remove" : "add"]("inactive");
}

resetButton.addEventListener("click", restoreDefaultColours);

function updateElementColour(variableName, colour) {
  document.documentElement.style.setProperty(variableName, colour);
}

function initialiseColourInput(inputElement, variableName) {
  inputElement.addEventListener("input", (event) => {
    const newColour = event.target.value;
    updateElementColour(variableName, newColour);
  });
  inputElement.value = getComputedStyle(document.documentElement)
    .getPropertyValue(variableName)
    .trim();
}

function restoreDefaultColours() {
  for (const [variableName, defaultColour] of Object.entries(defaultColours)) {
    updateElementColour(`--${variableName}`, defaultColour);
  }
  accentColourInput.value = defaultColours["accent-colour"];
  backgroundColourInput.value = defaultColours["background-colour"];
  controlsColourInput.value = defaultColours["controls-colour"];
  headerColourInput.value = defaultColours["header-colour"];
  menuColourInput.value = defaultColours["menu-colour"];
  tablePrimaryColourInput.value = defaultColours["table-primary-colour"];
  tableSecondaryColourInput.value = defaultColours["table-secondary-colour"];
  textColourInput.value = defaultColours["text-colour"];
  trackerColourInput.value = defaultColours["tracker-colour"];
}

selectAllCheckbox.addEventListener("click", function () {
  for (let checkbox of selectCheckboxes) {
    checkbox.checked = selectAllCheckbox.checked;
  }
});

document.querySelectorAll(".delete-book-button").forEach((button) => {
  button.addEventListener("click", (event) => {
    selectedRow = event.target.closest("tr");
    const selectedRowBookTitle =
      selectedRow.querySelector(".book-title").textContent;
    const selectedRowBookAuthor =
      selectedRow.querySelector(".book-author").textContent;
    updateDeleteBookMenuContent(selectedRowBookTitle, selectedRowBookAuthor);
    toggleMenu(deleteBookMenu);
  });
});

function updateDeleteBookMenuContent(bookTitle, bookAuthor) {
  bookTitleText.textContent = bookTitle.trim() + ",";
  bookAuthorText.textContent = "by " + bookAuthor.trim() + ".";
}

deleteBookMenuContinueButton.addEventListener("click", () => {
  if (selectedRow) {
    selectedRow.remove();
    selectedRow = null;
  }
  if (deleteBookMenu.classList.contains("active")) {
    toggleMenu(deleteBookMenu);
  }
});

addToggleMenuListeners(".edit-book-button", "edit-book-menu");
initialiseColourInput(accentColourInput, "--accent-colour");
initialiseColourInput(backgroundColourInput, "--background-colour");
initialiseColourInput(controlsColourInput, "--controls-colour");
initialiseColourInput(headerColourInput, "--header-colour");
initialiseColourInput(menuColourInput, "--menu-colour");
initialiseColourInput(tablePrimaryColourInput, "--table-primary-colour");
initialiseColourInput(tableSecondaryColourInput, "--table-secondary-colour");
initialiseColourInput(textColourInput, "--text-colour");
initialiseColourInput(trackerColourInput, "--tracker-colour");
