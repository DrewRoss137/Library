const overlay = document.getElementById("overlay");
const closeButtons = document.querySelectorAll(".close-button");
const settingsButton = document.getElementById("settings-button");
const settingsMenu = document.getElementById("settings-menu");
const restoreButton = document.getElementById("restore-button");
const restoreMenu = document.getElementById("restore-menu");
const editBookButtons = document.querySelectorAll(".edit-book-button");
const editBookMenu = document.getElementById("edit-book-menu");
const deleteBookButtons = document.querySelectorAll(".delete-book-button");
const deleteBookMenu = document.getElementById("delete-book-menu");
const deleteSelectedBookButton = document.getElementById(
  "delete-selected-books-button"
);
const deleteSelectedBookMenu = document.getElementById(
  "delete-selected-books-menu"
);
const deletedBooksButton = document.getElementById("deleted-books-button");
const deletedBooksMenu = document.getElementById("deleted-books-menu");
const addBookButton = document.getElementById("add-book-button");
const addBookMenu = document.getElementById("add-book-menu");

settingsButton.addEventListener("click", () =>
  updateMenuState(settingsMenu, "toggle")
);

restoreButton.addEventListener("click", () =>
  updateMenuState(restoreMenu, "toggle")
);

editBookButtons.forEach((editButton) => {
  editButton.addEventListener("click", () => {
    updateMenuState(editBookMenu, "toggle");
  });
});

deleteBookButtons.forEach((deleteButton) => {
  deleteButton.addEventListener("click", () => {
    updateMenuState(deleteBookMenu, "toggle");
  });
});

deleteSelectedBookButton.addEventListener("click", () =>
  updateMenuState(deleteSelectedBookMenu, "toggle")
);

deletedBooksButton.addEventListener("click", () =>
  updateMenuState(deletedBooksMenu, "toggle")
);

addBookButton.addEventListener("click", () =>
  updateMenuState(addBookMenu, "toggle")
);

closeButtons.forEach((closeButton) => {
  closeButton.addEventListener("click", () => {
    const parentMenu = closeButton.closest(".menu");
    if (parentMenu.classList.contains("active")) {
      updateMenuState(parentMenu, "close");
    }
  });
});

function isActive(menu, action) {
  return action === "toggle" ? !menu.classList.contains("active") : false;
}

function updateMenuState(menu, action) {
  const activeState = isActive(menu, action);
  overlay.classList[activeState ? "add" : "remove"]("active");
  overlay.classList[activeState ? "remove" : "add"]("inactive");
  menu.classList[activeState ? "add" : "remove"]("active");
  menu.classList[activeState ? "remove" : "add"]("inactive");
}
