const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.toggleIsRead = function() {
  this.isRead = !this.isRead;
};

function addBookToLibrary(title, author, pages, isRead) {
  let newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
}

function getReadStatusText(status) {
  return status ? "Finished" : "Unfinished";
}

const tableRows = document.querySelector(".bookshelf");

function displayLibrary() {

  // Clear out all rows first in case we are refreshing our table
  tableRows.innerHTML = "";

  myLibrary.forEach(book => {
    const row = document.createElement("tr");
    row.id = book.id;
    row.classList = "book"

    const title = document.createElement("td");
    title.textContent = `${book.title}`;
    row.appendChild(title);

    const author = document.createElement("td");
    author.textContent = `by ${book.author}`;
    row.appendChild(author);

    const pages = document.createElement("td");
    pages.textContent = `Pages - ${book.pages}`;
    row.appendChild(pages);

    const statusCell = document.createElement("td");
    const statusButton = document.createElement("button");
    statusButton.type = "button";
    const buttonStyle = book.isRead ? "finished" : "unfinished";
    statusButton.classList = "is-read " + buttonStyle;
    statusButton.textContent = getReadStatusText(book.isRead);
    statusCell.appendChild(statusButton);
    row.appendChild(statusCell);

    const deleteCell = document.createElement("td");
    deleteCell.classList = "delete-cell";
    const deleteButton = document.createElement("button");
    deleteButton.type = "button"
    deleteButton.classList = "delete";
    const deleteIcon = document.createElement("img");
    deleteIcon.src = "assets/trash-can-outline.svg";
    deleteIcon.alt = "outline of a trash can";
    deleteIcon.classList = "delete-icon";
    deleteButton.appendChild(deleteIcon);
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

    tableRows.appendChild(row);
  })
}

// Placeholder books
addBookToLibrary("East of Eden", "John Steinbeck", 730, true);
addBookToLibrary("Crime and Punishment", "Fyodor Dostoevsky", 800, false);
addBookToLibrary("Atomic Habits", "James Clear", 306, true);
addBookToLibrary("Crying in H Mart", "Michelle Zauner", 243, true);
addBookToLibrary("The Anthropocene Reviewed", "John Green", 304, false);

// Add table representing library on the web page
displayLibrary();

// Handle dialog to add new books
const addBookButton = document.querySelector("button.add-book");
const newBookDialog = document.querySelector("dialog.new-book");
const newBookForm = newBookDialog.querySelector(".new-book-form");
const confirmNewBookDialog = document.querySelector("button.confirm-new-book");
const cancelNewBookDialog = document.querySelector("button.cancel-new-book");

addBookButton.addEventListener("click", () => newBookDialog.showModal());

confirmNewBookDialog.addEventListener("click", (event) => {
  const newBookTitle = newBookDialog.querySelector("#title");
  const newBookAuthor = newBookDialog.querySelector("#author");
  const newBookPages = newBookDialog.querySelector("#pages");
  const newBookFinished = newBookDialog.querySelector("#finished-reading");
  addBookToLibrary(newBookTitle.value, newBookAuthor.value, newBookPages.value, newBookFinished.checked);
  displayLibrary();
  newBookForm.reset();
  newBookDialog.close();
  event.preventDefault();
});
cancelNewBookDialog.addEventListener("click", () => {
  newBookDialog.close();
  newBookForm.reset();
});

// Handle deletion of books
tableRows.addEventListener("click", (event) => {
  let libraryIndex;
  if (event.target.matches(".delete-icon")) {
    const rowToDelete = event.target.closest("tr");
    libraryIndex = myLibrary.findIndex(book => book.id == rowToDelete.id);
    rowToDelete.remove();
    myLibrary.splice(libraryIndex, 1);
  } else if (event.target.matches("button.is-read")) {
    const rowToToggleStatus = event.target.closest("tr");
    libraryIndex = myLibrary.findIndex(book => book.id == rowToToggleStatus.id);
    myLibrary[libraryIndex].toggleIsRead();
    event.target.textContent = getReadStatusText(myLibrary[libraryIndex].isRead);
    event.target.classList.toggle("finished");
  }
});