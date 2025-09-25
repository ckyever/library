const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary(title, author, pages, isRead) {
  let newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
}

function displayLibrary() {
  const table = document.querySelector(".bookshelf");

  myLibrary.forEach(book => {
    const row = document.createElement("tr");

    const title = document.createElement("td");
    title.textContent = book.title;
    row.appendChild(title);

    const author = document.createElement("td");
    author.textContent = book.author;
    row.appendChild(author);

    const pages = document.createElement("td");
    pages.textContent = book.pages;
    row.appendChild(pages);

    const isRead = document.createElement("td");
    isRead.textContent = book.isRead ? "Yes" : "No";
    row.appendChild(isRead);

    const id = document.createElement("td");
    id.textContent = book.id;
    row.appendChild(id);

    table.appendChild(row);
  })
}

addBookToLibrary("East of Eden", "John Steinbeck", 730, true);
addBookToLibrary("Crime and Punishment", "Fyodor Dostoevsky", 800, false);
addBookToLibrary("Atomic Habits", "James Clear", 306, true);
addBookToLibrary("Crying in H Mart", "Michelle Zauner", 243, true);
addBookToLibrary("The Anthropocene Reviewed", "John Green", 304, false);

displayLibrary();