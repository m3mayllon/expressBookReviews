let books = require("../database/books.js");

function fetchBooks() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(books);
    }, 1000);
  });
}

function fetchBooksByFilter(filterFunction, filterValue) {
  return new Promise((resolve, reject) => {
    let booksArray = Object.values(books);
    let filteredBooks = booksArray.filter(filterFunction(filterValue));
    setTimeout(() => {
      resolve(filteredBooks);
    }, 1000);
  });
}

function filterByAuthor(author) {
  return (book) => book.author === author;
}

function filterByISBN(isbn) {
  return (_, index) => (index + 1).toString() === isbn;
}

function filterByTitle(title) {
  return (book) => book.title === title;
}

module.exports = {
  fetchBooks,
  fetchBooksByFilter,
  filterByAuthor,
  filterByISBN,
  filterByTitle,
};
