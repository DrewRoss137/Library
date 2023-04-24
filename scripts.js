const overlay = document.getElementById("overlay");
const settingsButton = document.getElementById("settings-button");
const settingsMenu = document.getElementById("settings-menu");
const closeButtons = document.querySelectorAll(".close-button");
const restoreButton = document.getElementById("restore-button");
const restoreMenu = document.getElementById("restore-menu");
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
