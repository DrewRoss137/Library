const overlay = document.getElementById("overlay");
const closeButton = document.querySelectorAll(".close-button");
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
const tableAlternateColourInput = document.getElementById(
  "table-primary-alternate-colour-input"
);
const tableSecondaryColourInput = document.getElementById(
  "table-secondary-colour-input"
);
const textColourInput = document.getElementById("text-colour-input");
const trackerColourInput = document.getElementById("tracker-colour-input");
const resetButton = document.getElementById("reset-button");
const tableBody = document.getElementById("table-body");
const titleHeader = document.getElementById("title");
const authorHeader = document.getElementById("author");
const pagesHeader = document.getElementById("pages");
const publishedHeader = document.getElementById("published");
const acquiredHeader = document.getElementById("acquired");
const statusHeader = document.getElementById("status");
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
const editBookEditBookButton = document.getElementById("edit-books-button");
const deleteBookMenu = document.getElementById("delete-book-menu");
const deleteBookMenuContinueButton = document.getElementById(
  "delete-book-menu-continue-button"
);
const deleteSelectedBooksMenu = document.getElementById(
  "delete-selected-books-menu"
);
const deleteSelectedBooksText = document.getElementById(
  "delete-selected-books-text"
);
const deleteSelectedBooksMenuContinueButton = document.getElementById(
  "delete-selected-books-menu-continue-button"
);
const cancelButton = document.getElementById(
  "delete-selected-books-menu-cancel-button"
);
const deletedBooksSelect = document.getElementById("deleted-books-select");
const deleteButton = document.getElementById("delete-button");
const restoreButton = document.getElementById("restore-books-button");
const addBookButton = document.getElementById("add-books-button");
const addBookMenu = document.getElementById("add-book-menu");
const totalBooksValue = document.getElementById("total-books-value");
const totalPagesValue = document.getElementById("total-pages-value");
const uniqueAuthorsValue = document.getElementById("authors-value");
const readBooksValue = document.getElementById("read-books-value");
const unreadBooksValue = document.getElementById("unread-books-value");
const deletedBooksValue = document.getElementById("deleted-books-value");

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
  "table-primary-alternate-colour": "#3d3645",
  "table-secondary-colour": "#393646",
  "text-colour": "#ffffff",
  "tracker-colour": "#4f4557",
};

class Book {
  constructor(
    title,
    author,
    pages,
    publishDate,
    acquisitionDate,
    status,
    index
  ) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.publishDate = publishDate;
    this.acquisitionDate = acquisitionDate;
    this.status = status;
    this.index = index;
  }
}

const library = [
  new Book(
    "The Pragmatic Programmer: Your Journey to Mastery",
    "David Thomas, Andrew Hunt",
    352,
    "2019-12-02",
    "2023-01-23",
    "Unread"
  ),
  new Book(
    "Clean Code: A Handbook of Agile Software Craftsmanship",
    "Robert C. Martin",
    464,
    "2008-08-01",
    "2023-02-01",
    "Read"
  ),
  new Book(
    "Code Complete: A Practical Handbook of Software Construction",
    "Steve McConnell",
    960,
    "2004-06-09",
    "2023-02-14",
    "Unread"
  ),
  new Book(
    "Refactoring: Improving the Design of Existing Code",
    "Martin Fowler",
    448,
    "2019-01-02",
    "2023-03-19",
    "Read"
  ),
  new Book(
    "The Mythical Man-Month: Essays on Software Engineering",
    "Frederick Brooks Jr.",
    336,
    "1995-08-15",
    "2023-03-23",
    "Unread"
  ),
  new Book(
    "The Clean Coder: A Code of Conduct for Professional Programmers",
    "Robert C. Martin",
    242,
    "2011-03-13",
    "2023-06-21",
    "Unread"
  ),
  new Book(
    "Working Effectively with Legacy Code",
    "Michael Feathers",
    456,
    "2004-09-22",
    "2023-07-27",
    "Read"
  ),
  new Book(
    "Design Patterns: Elements of Reusable Object-Oriented Software",
    "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
    416,
    "1995-03-14",
    "2023-08-17",
    "Read"
  ),
  new Book(
    "Cracking the Coding Interview: 189 Programming Questions & Solutions",
    "Gayle Laakmann McDowell",
    706,
    "2015-07-01",
    "2023-12-07",
    "Read"
  ),
  new Book(
    "Soft Skills: The Software Developer's Life Manual",
    "John Sonmez",
    501,
    "2020-11-11",
    "2023-12-23",
    "Unread"
  ),
].map(
  (book, index) =>
    new Book(
      book.title,
      book.author,
      book.pages,
      book.publishDate,
      book.acquisitionDate,
      book.status,
      index
    )
);

const closeButtons = [...closeButton, cancelButton];

const deletedBooks = [
  new Book(
    "Peopleware: Productive Projects and Teams",
    "Tom DeMarco, Timothy Lister",
    272,
    "2016-04-22",
    "2023-03-23",
    "Unread"
  ),
  new Book(
    "Grokking Algorithms: An illustrated guide for programmers and other curious people",
    "Aditya Bhargava",
    300,
    "2015-12-31",
    "2023-03-23",
    "Unread"
  ),
  new Book(
    "Algorithms",
    "Robert Sedgewick, Kevin Wayne",
    976,
    "2011-04-28",
    "2023-03-23",
    "Unread"
  ),
].map(
  (book, index) =>
    new Book(
      book.title,
      book.author,
      book.pages,
      book.publishDate,
      book.acquisitionDate,
      book.status,
      index
    )
);

let sortDirection = {
  title: 1,
  author: 1,
  pages: 1,
  publishDate: 1,
  acquisitionDate: 1,
  status: 1,
};

let selectedRow;

menuItems.forEach(({ buttonID, menuID }) => {
  const button = document.querySelector(`#${buttonID}`);
  const menu = document.querySelector(`#${menuID}`);
  button.addEventListener("click", () => {
    toggleMenu(menu);
  });
});

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const parentMenu = button.closest(".menu");
    if (parentMenu.classList.contains("active")) {
      toggleMenu(parentMenu);
    }
  });
});

resetButton.addEventListener("click", restoreDefaultColours);

tableBody.addEventListener("click", (event) => {
  const bookStatus = event.target.closest(".book-status");
  const editBookButton = event.target.closest(".edit-book-button");
  const deleteBookButton = event.target.closest(".delete-book-button");
  if (bookStatus) {
    const book = library.find((book) => book.statusElement === bookStatus);
    if (book) {
      const newStatus = bookStatus.textContent === "Read" ? "Unread" : "Read";
      book.status = newStatus;
      bookStatus.textContent = newStatus;
      updateTracker();
    }
  } else if (editBookButton) {
    selectedRow = editBookButton.closest("tr");
    populateEditBookMenuInputs(selectedRow);
    toggleMenu(editBookMenu);
  } else if (deleteBookButton) {
    selectedRow = deleteBookButton.closest("tr");
    const selectedBook = getSelectedRowData(selectedRow);
    convertBookToOption(
      selectedBook.bookTitleText,
      selectedBook.bookAuthorText,
      selectedBook.bookPagesText,
      selectedBook.bookPublishedText,
      selectedBook.bookAcquiredText,
      selectedBook.bookStatusText
    );
    updateDeleteBookMenuContent(
      selectedBook.bookTitleText,
      selectedBook.bookAuthorText
    );
    toggleMenu(deleteBookMenu);
  }
});

titleHeader.addEventListener("click", () => {
  sortBooks("title");
  renderSortedTable();
});

authorHeader.addEventListener("click", () => {
  sortBooks("author");
  renderSortedTable();
});

pagesHeader.addEventListener("click", () => {
  sortBooks("pages");
  renderSortedTable();
});

publishedHeader.addEventListener("click", () => {
  sortBooks("publishDate");
  renderSortedTable();
});

acquiredHeader.addEventListener("click", () => {
  sortBooks("acquisitionDate");
  renderSortedTable();
});

statusHeader.addEventListener("click", () => {
  sortBooks("status");
  renderSortedTable();
});

function deleteBookByIndex(bookIndex) {
  const deletedBook = library[bookIndex];
  deletedBooks.push(deletedBook);
  library.splice(bookIndex, 1);
  convertBookToOption(
    deletedBook.title,
    deletedBook.author,
    deletedBook.pages,
    deletedBook.publishDate,
    deletedBook.acquisitionDate,
    deletedBook.status
  );
  library.forEach((book, index) => {
    book.index = index;
  });
  updateTracker();
}

selectAllCheckbox.addEventListener("change", () => {
  for (let i = 0; i < selectCheckboxes.length; i++) {
    selectCheckboxes[i].checked = selectAllCheckbox.checked;
  }
  updateSelectedBookCount();
});

editBookEditBookButton.addEventListener("click", updateSelectedRow);

deleteBookMenuContinueButton.addEventListener("click", () => {
  if (selectedRow) {
    const selectedBook = getSelectedRowData(selectedRow);
    const bookIndex = selectedBook.bookIndex;
    deleteBookByIndex(bookIndex);
    selectedRow.remove();
    selectedRow = null;
  }
  if (deleteBookMenu.classList.contains("active")) {
    toggleMenu(deleteBookMenu);
  }
});

deletedBooks.forEach((book) => {
  const option = document.createElement("option");
  option.classList.add("deleted-books-option");
  option.textContent = `${book.title} - ${book.author}`;
  option.dataset.title = book.title;
  option.dataset.author = book.author;
  option.dataset.pages = book.pages;
  option.dataset.publishDate = book.publishDate;
  option.dataset.acquisitionDate = book.acquisitionDate;
  option.dataset.status = book.status;
  deletedBooksSelect.appendChild(option);
});

deleteButton.addEventListener("click", () => {
  const selectedOption =
    deletedBooksSelect.options[deletedBooksSelect.selectedIndex];
  if (selectedOption) {
    selectedOption.remove();
  }
});

deleteSelectedBooksMenuContinueButton.addEventListener("click", () => {
  const allSelectedCheckboxes = document.querySelectorAll(
    ".select-checkbox:checked"
  );
  const selectedCheckboxes = Array.from(allSelectedCheckboxes).filter(
    (checkbox) => checkbox.id !== "select-all-checkbox"
  );
  const selectedIndices = [];
  selectedCheckboxes.forEach((checkbox) => {
    const selectedRow = checkbox.closest(".table-body-row");
    const selectedBook = getSelectedRowData(selectedRow);
    const bookIndex = selectedBook.bookIndex;
    selectedIndices.push(bookIndex);
  });
  selectedIndices.sort((a, b) => b - a);
  selectedIndices.forEach((bookIndex) => {
    deleteBookByIndex(bookIndex);
  });
  selectedCheckboxes.forEach((checkbox) => {
    const selectedRow = checkbox.closest(".table-body-row");
    selectedRow.remove();
  });
  if (deleteSelectedBooksMenu.classList.contains("active")) {
    toggleMenu(deleteSelectedBooksMenu);
  }
});

restoreButton.addEventListener("click", () => {
  const selectedOption =
    deletedBooksSelect.options[deletedBooksSelect.selectedIndex];
  if (selectedOption) {
    const bookId = selectedOption.dataset.bookId;
    const bookIndex = deletedBooks.findIndex((book) => book.id === bookId);
    if (bookIndex !== -1) {
      const restoredBook = deletedBooks[bookIndex];
      deletedBooks.splice(bookIndex, 1);
      library.push(restoredBook);
      restoreSelectedBook(restoredBook);
      selectedOption.remove();
      updateTracker();
    }
  }
});

addBookButton.addEventListener("click", function () {
  let title = document.getElementById("add-book-title-input").value;
  let author = document.getElementById("add-book-author-input").value;
  let pages = document.getElementById("add-book-pages-input").value;
  let publishDate = document.getElementById(
    "add-book-publish-date-input"
  ).value;
  let acquisitionDate = document.getElementById(
    "add-book-acquisition-date-input"
  ).value;
  let status = document.getElementById("add-book-status-select").value;
  let newBook = new Book(
    title,
    author,
    pages,
    publishDate,
    acquisitionDate,
    status
  );
  createBookTableRow(newBook);
  title.value = "";
  author.value = "";
  pages.value = "";
  publishDate.value = "";
  acquisitionDate.value = "";
  addBookToLibrary(newBook);
  displayBooks();
  if (addBookMenu.classList.contains("active")) {
    toggleMenu(addBookMenu);
  }
  updateTracker();
});

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
  tableAlternateColourInput.value =
    defaultColours["table-primary-alternate-colour"];
  tableSecondaryColourInput.value = defaultColours["table-secondary-colour"];
  textColourInput.value = defaultColours["text-colour"];
  trackerColourInput.value = defaultColours["tracker-colour"];
}

function populateEditBookMenuInputs(selectedRow) {
  const selectedBook = getSelectedRowData(selectedRow);
  editBookTitleInput.value = selectedBook.bookTitleText;
  editBookAuthorInput.value = selectedBook.bookAuthorText;
  editBookPagesInput.value = selectedBook.bookPagesText;
  editBookPublishDateInput.value = formatDate(selectedBook.bookPublishedText);
  editBookAcquisitionDateInput.value = formatDate(
    selectedBook.bookAcquiredText
  );
  editBookStatusSelect.value = selectedBook.bookStatusText;
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
    .querySelector(".book-status")
    .textContent.trim();
  const bookIndex = parseInt(selectedRow.dataset.index);
  return {
    bookTitleText,
    bookAuthorText,
    bookPagesText,
    bookPublishedText,
    bookAcquiredText,
    bookStatusText,
    bookIndex,
  };
}

function convertBookToOption(
  title,
  author,
  pages,
  published,
  acquired,
  status
) {
  const option = document.createElement("option");
  option.textContent = `${title} - ${author}`;
  option.className = "deleted-books-option";
  option.id = "deleted-books-option";
  option.dataset.title = title;
  option.dataset.author = author;
  option.dataset.pages = pages;
  option.dataset.published = new Date(published);
  option.dataset.acquired = new Date(acquired);
  option.dataset.status = status;
  deletedBooksSelect.appendChild(option);
}

function updateDeleteBookMenuContent(bookTitle, bookAuthor) {
  bookTitleText.textContent = bookTitle.trim() + ",";
  bookAuthorText.textContent = "by " + bookAuthor.trim() + ".";
}

function sortBooks(key) {
  library.sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];
    if (key === "publishDate" || key === "acquisitionDate") {
      if (valueA < valueB) return -1 * sortDirection[key];
      if (valueA > valueB) return 1 * sortDirection[key];
      return 0;
    } else {
      if (valueA < valueB) return -1 * sortDirection[key];
      if (valueA > valueB) return 1 * sortDirection[key];
      return 0;
    }
  });
  sortDirection[key] = -1 * sortDirection[key];
}

function renderSortedTable() {
  tableBody.innerHTML = "";
  library.forEach((book) => createBookTableRow(book));
}

function updateSelectedRow() {
  if (!selectedRow) {
    return;
  }
  const selectedRowIndex = Array.from(
    selectedRow.parentElement.children
  ).indexOf(selectedRow);
  const book = library[selectedRowIndex];
  book.title = editBookTitleInput.value.trim();
  book.author = editBookAuthorInput.value.trim();
  book.pages = parseInt(editBookPagesInput.value.trim(), 10);
  book.publishDate = editBookPublishDateInput.value;
  book.acquisitionDate = editBookAcquisitionDateInput.value;
  book.status = editBookStatusSelect.value;
  const selectedRowBookTitle = selectedRow.querySelector(".book-title");
  const selectedRowBookAuthor = selectedRow.querySelector(".book-author");
  const selectedRowBookPages = selectedRow.querySelector(".book-pages");
  const selectedRowBookPublishDate =
    selectedRow.querySelector(".book-published");
  const selectedRowBookAcquisitionDate =
    selectedRow.querySelector(".book-acquired");
  const selectedRowBookStatus = selectedRow.querySelector(".book-status");
  selectedRowBookTitle.textContent = book.title;
  selectedRowBookAuthor.textContent = book.author;
  selectedRowBookPages.textContent = book.pages;
  selectedRowBookPublishDate.textContent = formatDisplayDate(book.publishDate);
  selectedRowBookAcquisitionDate.textContent = formatDisplayDate(
    book.acquisitionDate
  );
  selectedRowBookStatus.textContent = book.status;
  if (editBookMenu.classList.contains("active")) {
    toggleMenu(editBookMenu);
  }
  selectedRow = null;
}

function restoreSelectedBook() {
  const selectedOption =
    deletedBooksSelect.options[deletedBooksSelect.selectedIndex];
  if (selectedOption) {
    const newBook = new Book(
      selectedOption.dataset.title,
      selectedOption.dataset.author,
      parseInt(selectedOption.dataset.pages),
      selectedOption.dataset.publishDate,
      selectedOption.dataset.acquisitionDate,
      selectedOption.dataset.status
    );
    createBookTableRow(newBook);
    selectedOption.remove();
  }
}

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
  newRow.id = "table-body-row";
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
    ${createCell(book.status, "book-status", "book-status")}
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
  newRow.setAttribute("data-index", book.index);
  book.statusElement = newRow.querySelector(".book-status");
}

function createCell(content, classes, id) {
  return `<td class="${classes}" id="${id}">${content}</td>`;
}

function updateElementColour(variableName, colour) {
  document.documentElement.style.setProperty(variableName, colour);
}

function formatDate(dateString) {
  const dateArray = dateString.split("/");
  const year = dateArray[2];
  const month = dateArray[1].padStart(2, "0");
  const day = dateArray[0].padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDisplayDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
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

function initialiseCheckboxListeners() {
  for (let i = 0; i < selectCheckboxes.length; i++) {
    selectCheckboxes[i].addEventListener("change", () => {
      for (let j = 0; j < selectCheckboxes.length; j++) {
        if (
          selectCheckboxes[j] !== selectAllCheckbox &&
          !selectCheckboxes[j].checked
        ) {
          selectAllCheckbox.checked = false;
          break;
        }
        selectAllCheckbox.checked = true;
      }
      updateSelectedBookCount();
    });
  }
}

function updateSelectedBookCount() {
  const selectedBookNumber = Array.from(selectCheckboxes)
    .filter((checkbox) => checkbox !== selectAllCheckbox)
    .reduce((acc, checkbox) => acc + checkbox.checked, 0);

  deleteSelectedBooksText.textContent =
    selectedBookNumber === 0
      ? "You do not have any books selected."
      : `This will erase ${selectedBookNumber} book${
          selectedBookNumber > 1 ? "s" : ""
        }.`;
}

function updateTracker() {
  const totalBooks = library.length;
  const authorSet = new Set();
  library.forEach((book) => {
    const authors = book.author.split(",").map((author) => author.trim());
    authors.forEach((author) => authorSet.add(author));
  });
  const uniqueAuthors = authorSet.size;
  const totalPages = library.reduce(
    (sum, book) => sum + parseInt(book.pages),
    0
  );
  const readBooks = library.filter((book) => book.status === "Read").length;
  const unreadBooks = library.filter((book) => book.status === "Unread").length;
  const deletedBooksNumber = deletedBooks.length;
  totalBooksValue.textContent = totalBooks;
  totalPagesValue.textContent = totalPages;
  uniqueAuthorsValue.textContent = uniqueAuthors;
  readBooksValue.textContent = readBooks;
  unreadBooksValue.textContent = unreadBooks;
  deletedBooksValue.textContent = deletedBooksNumber;
}

displayBooks();
initialiseCheckboxListeners();
updateSelectedBookCount();
updateTracker();

initialiseColourInput(accentColourInput, "--accent-colour");
initialiseColourInput(backgroundColourInput, "--background-colour");
initialiseColourInput(controlsColourInput, "--controls-colour");
initialiseColourInput(headerColourInput, "--header-colour");
initialiseColourInput(menuColourInput, "--menu-colour");
initialiseColourInput(tablePrimaryColourInput, "--table-primary-colour");
initialiseColourInput(tableAlternateColourInput, "--table-alternate-colour");
initialiseColourInput(tableSecondaryColourInput, "--table-secondary-colour");
initialiseColourInput(textColourInput, "--text-colour");
initialiseColourInput(trackerColourInput, "--tracker-colour");

/*
To-Do:
  -Ascending And Descending Sorting By Clicking TH Elements, With An Arrow Appearing Adjacent Upon Clicking;
  -Editing A Book Causes Tracker Values To Change;
  -Deleted Selected Book(s) Functionality;
  -Validate Input Forms Within Edit Book And Add Book;
  -Bug: Deleting Books Will Make The Last Book In The Library Broken: Unable To Toggle Status;
  -Bug: Deleting All Books But One Will Result In Total Pages = 501;
*/
