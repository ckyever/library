const myLibrary = [];

function Book(title, author, pages) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
}

function addBookToLibrary(title, author, pages) {
  let newBook = Book(title, author, pages);
  myLibrary.push(newBook);
}