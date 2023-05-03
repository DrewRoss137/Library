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
const tableBody = document.getElementById("table-body");
const selectAllCheckbox = document.getElementById("select-all-checkbox");
const selectCheckboxes = document.getElementsByClassName("select-checkbox");
const bookTitleText = document.getElementById("book-title-text");
const bookAuthorText = document.getElementById("book-author-text");
const editBookMenu = document.getElementById("edit-book-menu");
const editBookTitleInput = document.getElementById("edit-book-title-input");
const editBookAuthorInput = document.getElementById("edit-book-author-input");
const editBookPagesInput = document.getElementById("edit-book-pages-input");
const editBookPublishDateInput = document.getElementById(
  "edit-book-publish-date-input"
);
const editBookAcquisitionDateInput = document.getElementById(
  "edit-book-acquisition-date-input"
);
const editBookStatusSelect = document.getElementById("edit-book-status-select");
const editBookButton = document.getElementById("edit-books-button");
const deleteBookMenu = document.getElementById("delete-book-menu");
const deleteBookMenuContinueButton = document.getElementById(
  "delete-book-menu-continue-button"
);
const addBookButton = document.getElementById("add-books-button");

const library = [
  {
    title: "The Pragmatic Programmer: Your Journey to Mastery",
    author: "David Thomas, Andrew Hunt",
    pages: 352,
    publishDate: "2019-12-02",
    acquisitionDate: "2023-01-23",
    status: "Unread",
  },
  {
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    pages: 464,
    publishDate: "2008-08-01",
    acquisitionDate: "2023-02-01",
    status: "Unread",
  },
  {
    title: "Code Complete: A Practical Handbook of Software Construction",
    author: "Steve McConnell",
    pages: 960,
    publishDate: "2004-06-09",
    acquisitionDate: "2023-02-14",
    status: "Unread",
  },
  {
    title: "Refactoring: Improving the Design of Existing Code",
    author: "Martin Fowler",
    pages: 448,
    publishDate: "2019-01-02",
    acquisitionDate: "2023-03-19",
    status: "Read",
  },
  {
    title: "The Mythical Man-Month: Essays on Software Engineering",
    author: "Frederick Brooks Jr.",
    pages: 336,
    publishDate: "1995-08-15",
    acquisitionDate: "2023-03-23",
    status: "Unread",
  },
  {
    title: "The Clean Coder: A Code of Conduct for Professional Programmers",
    author: "Robert C. Martin",
    pages: 242,
    publishDate: "2011-03-13",
    acquisitionDate: "2023-06-21",
    status: "Unread",
  },
  {
    title: "Working Effectively with Legacy Code",
    author: "Michael Feathers",
    pages: 456,
    publishDate: "2004-09-22",
    acquisitionDate: "2023-07-27",
    status: "Read",
  },
  {
    title: "Design Patterns: Elements of Reusable Object-Oriented Software",
    author: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
    pages: 416,
    publishDate: "1995-03-14",
    acquisitionDate: "2023-08-17",
    status: "Read",
  },
  {
    title:
      "Cracking the Coding Interview: 189 Programming Questions & Solutions",
    author: "Gayle Laakmann McDowell",
    pages: 706,
    publishDate: "2015-07-01",
    acquisitionDate: "2023-12-07",
    status: "Read",
  },
  {
    title: "Soft Skills: The Software Developer's Life Manual",
    author: "John Sonmez",
    pages: 501,
    publishDate: "2020-11-11",
    acquisitionDate: "2023-12-23",
    status: "Unread",
  },
];

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

class Book {
  constructor(title, author, pages, publishDate, acquisitionDate, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.publishDate = publishDate;
    this.acquisitionDate = acquisitionDate;
    this.status = status;
  }
}

let selectedRow;

menuItems.forEach(({ buttonID, menuID }) => {
  const button = document.querySelector(`#${buttonID}`);
  const menu = document.querySelector(`#${menuID}`);
  button.addEventListener("click", () => {
    toggleMenu(menu);
  });
});

document.querySelectorAll(".close-button").forEach((closeButton) => {
  closeButton.addEventListener("click", () => {
    const parentMenu = closeButton.closest(".menu");
    if (parentMenu.classList.contains("active")) {
      toggleMenu(parentMenu);
    }
  });
});

resetButton.addEventListener("click", restoreDefaultColours);

tableBody.addEventListener("click", (event) => {
  const editButton = event.target.closest(".edit-book-button");
  const deleteButton = event.target.closest(".delete-book-button");
  if (editButton) {
    selectedRow = editButton.closest("tr");
    populateEditBookMenuInputs(selectedRow);
    toggleMenu(editBookMenu);
  }
  if (deleteButton) {
    selectedRow = deleteButton.closest("tr");
    const rowData = getSelectedRowData(selectedRow);
    updateDeleteBookMenuContent(rowData.bookTitleText, rowData.bookAuthorText);
    toggleMenu(deleteBookMenu);
  }
});

selectAllCheckbox.addEventListener("click", function () {
  for (let checkbox of selectCheckboxes) {
    checkbox.checked = selectAllCheckbox.checked;
  }
});

editBookButton.addEventListener("click", updateSelectedRow);

deleteBookMenuContinueButton.addEventListener("click", () => {
  if (selectedRow) {
    selectedRow.remove();
    selectedRow = null;
  }
  if (deleteBookMenu.classList.contains("active")) {
    toggleMenu(deleteBookMenu);
  }
});

addBookButton.addEventListener("click", function () {
  const title = document.getElementById("add-book-title-input").value;
  const author = document.getElementById("add-book-author-input").value;
  const pages = document.getElementById("add-book-pages-input").value;
  const publishDate = document.getElementById(
    "add-book-publish-date-input"
  ).value;
  const acquisitionDate = document.getElementById(
    "add-book-acquisition-date-input"
  ).value;
  const status = document.getElementById("add-book-status-select").value;
  const newBook = new Book(
    title,
    author,
    pages,
    publishDate,
    acquisitionDate,
    status
  );
  createBookTableRow(newBook);
  document.getElementById("add-book-title-input").value = "";
  document.getElementById("add-book-author-input").value = "";
  document.getElementById("add-book-pages-input").value = "";
  document.getElementById("add-book-publish-date-input").value = "";
  document.getElementById("add-book-acquisition-date-input").value = "";
  addBookToLibrary(newBook);
  displayBooks();
});

function addBookToLibrary(book) {
  library.push(book);
}

function displayBooks() {
  tableBody.innerHTML = "";
  library.forEach((book) => {
    createBookTableRow(book);
  });
}

function createBookTableRow(book) {
  const newRow = tableBody.insertRow(0);
  newRow.classList.add("table-body-row");
  newRow.innerHTML = `
    ${createCell(
      `<input class="select-checkbox" id="select-checkbox" type="checkbox" />`,
      "book-select",
      "book-select"
    )}
    ${createCell(book.title, "book-title", "book-title")}
    ${createCell(book.author, "book-author", "book-author")}
    ${createCell(book.pages, "book-pages", "book-pages")}
    ${createCell(
      formatDisplayDate(book.publishDate),
      "book-published",
      "book-published"
    )}
    ${createCell(
      formatDisplayDate(book.acquisitionDate),
      "book-acquired",
      "book-acquired"
    )}
    ${createCell(book.status, "book-status-container", "book-status")}
    ${createCell(
      `
      <a class="book-alter-button-container" id="edit-book-container" title="Edit Book">
      <svg class="edit-book-button" id="edit-book-button" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.39 10.74L11 19.13V22H6C4.89 22 4 21.11 4 20V4C4 2.9 4.89 2 6 2H7V9L9.5 7.5L12 9V2H18C19.1 2 20 2.89 20 4V10.3C19.78 10.42 19.57 10.56 19.39 10.74M13 19.96V22H15.04L21.17 15.88L19.13 13.83L13 19.96M22.85 13.47L21.53 12.15C21.33 11.95 21 11.95 20.81 12.15L19.83 13.13L21.87 15.17L22.85 14.19C23.05 14 23.05 13.67 22.85 13.47Z" />
      </svg>
    </a>
    <a class="book-alter-button-container" id="delete-book-container" title="Delete Book">
      <svg class="delete-book-button" id="delete-book-button" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
        />
        </svg>
      </a>
        `,
      "book-alter",
      "book-alter"
    )}
    `;
}

function createCell(content, classes, id) {
  return `<td class="${classes}" id="${id}">${content}</td>`;
}

function toggleMenu(menu) {
  const isActive = !menu.classList.contains("active");
  overlay.classList[isActive ? "add" : "remove"]("active");
  overlay.classList[isActive ? "remove" : "add"]("inactive");
  menu.classList[isActive ? "add" : "remove"]("active");
  menu.classList[isActive ? "remove" : "add"]("inactive");
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

function populateEditBookMenuInputs(selectedRow) {
  const rowData = getSelectedRowData(selectedRow);
  editBookTitleInput.value = rowData.bookTitleText;
  editBookAuthorInput.value = rowData.bookAuthorText;
  editBookPagesInput.value = rowData.bookPagesText;
  editBookPublishDateInput.value = formatDate(rowData.bookPublishedText);
  editBookAcquisitionDateInput.value = formatDate(rowData.bookAcquiredText);
  editBookStatusSelect.value = rowData.bookStatusText;
}

function formatDate(dateString) {
  const dateArray = dateString.split("/");
  const year = dateArray[2];
  const month = dateArray[1].padStart(2, "0");
  const day = dateArray[0].padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function updateSelectedRow() {
  if (!selectedRow) {
    return;
  }
  const selectedRowBookTitle = selectedRow.querySelector(".book-title");
  const selectedRowBookAuthor = selectedRow.querySelector(".book-author");
  const selectedRowBookPages = selectedRow.querySelector(".book-pages");
  const selectedRowBookPublishDate =
    selectedRow.querySelector(".book-published");
  const selectedRowBookAcquisitionDate =
    selectedRow.querySelector(".book-acquired");
  const selectedRowBookStatus = selectedRow.querySelector(
    ".book-status-container"
  );
  selectedRowBookTitle.textContent = editBookTitleInput.value.trim();
  selectedRowBookAuthor.textContent = editBookAuthorInput.value.trim();
  selectedRowBookPages.textContent = editBookPagesInput.value.trim();
  selectedRowBookPublishDate.textContent = formatDisplayDate(
    editBookPublishDateInput.value
  );
  selectedRowBookAcquisitionDate.textContent = formatDisplayDate(
    editBookAcquisitionDateInput.value
  );
  selectedRowBookStatus.textContent = editBookStatusSelect.value;
  if (editBookMenu.classList.contains("active")) {
    toggleMenu(editBookMenu);
  }
  selectedRow = null;
}

function formatDisplayDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function getSelectedRowData(selectedRow) {
  const bookTitleText = selectedRow
    .querySelector(".book-title")
    .textContent.trim();
  const bookAuthorText = selectedRow
    .querySelector(".book-author")
    .textContent.trim();
  const bookPagesText = selectedRow
    .querySelector(".book-pages")
    .textContent.trim();
  const bookPublishedText = selectedRow
    .querySelector(".book-published")
    .textContent.trim();
  const bookAcquiredText = selectedRow
    .querySelector(".book-acquired")
    .textContent.trim();
  const bookStatusText = selectedRow
    .querySelector(".book-status-container")
    .textContent.trim();

  return {
    bookTitleText,
    bookAuthorText,
    bookPagesText,
    bookPublishedText,
    bookAcquiredText,
    bookStatusText,
  };
}

function updateDeleteBookMenuContent(bookTitle, bookAuthor) {
  bookTitleText.textContent = bookTitle.trim() + ",";
  bookAuthorText.textContent = "by " + bookAuthor.trim() + ".";
}

displayBooks();

initialiseColourInput(accentColourInput, "--accent-colour");
initialiseColourInput(backgroundColourInput, "--background-colour");
initialiseColourInput(controlsColourInput, "--controls-colour");
initialiseColourInput(headerColourInput, "--header-colour");
initialiseColourInput(menuColourInput, "--menu-colour");
initialiseColourInput(tablePrimaryColourInput, "--table-primary-colour");
initialiseColourInput(tableSecondaryColourInput, "--table-secondary-colour");
initialiseColourInput(textColourInput, "--text-colour");
initialiseColourInput(trackerColourInput, "--tracker-colour");
