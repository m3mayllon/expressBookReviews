let books = require("../database/books.js");

/* READ */
/* READ */
/* READ */
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

/* UPDATE */
/* UPDATE */
/* UPDATE */
function updateBookReviews(filteredBooks, username, review) {
  return new Promise((resolve, reject) => {
    const updatedBooks = filteredBooks.map((book) => {
      const updatedBook = { ...book };
      if (!updatedBook.reviews) {
        updatedBook.reviews = {};
      }
      updatedBook.reviews[username] = review;
      return updatedBook;
    });
    resolve(updatedBooks);
  });
}

/* DELETE */
/* DELETE */
/* DELETE */
function deleteBookReviews(filteredBooks, username) {
  return new Promise((resolve, reject) => {
    const updatedBooks = filteredBooks.map((book) => {
      const updatedBook = { ...book };
      if (!updatedBook.reviews) {
        updatedBook.reviews = {};
      }
      if (updatedBook.reviews[username]) {
        delete updatedBook.reviews[username];
      }
      return updatedBook;
    });
    resolve(updatedBooks);
  });
}

module.exports = {
  fetchBooks,
  fetchBooksByFilter,
  filterByAuthor,
  filterByISBN,
  filterByTitle,
  updateBookReviews,
  deleteBookReviews,
};
