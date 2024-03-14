const express = require("express");
const router = express.Router();

let books = require("../database/books.js");

router.get("/", function (req, res) {
  // return book list available in the shop
  return res.status(200).json(books);
});

router.get("/author", function (req, res) {
  // return all books based on author
  const author = req.query.author;

  // filter out books
  let booksArray = Object.values(books);
  let filtered_books = booksArray.filter((book) => book.author === author);

  return res.status(200).json(filtered_books);
});

router.get("/title", function (req, res) {
  // return all books based on title
  const title = req.query.title;

  // filter out books
  let booksArray = Object.values(books);
  let filtered_books = booksArray.filter((book) => book.title === title);

  return res.status(200).json(filtered_books);
});

router.get("/isbn", function (req, res) {
  // return book details based on ISBN
  let book_info = books[req.query.isbn];

  // check if book exists
  if (!book_info) {
    return res.status(200).json({});
  }

  return res.status(200).json(book_info);
});

router.get("/review", function (req, res) {
  // return book reviews based on ISBN
  let book_info = books[req.query.isbn];

  // check if book exists
  if (!book_info) {
    return res.status(200).json({});
  }

  return res.status(200).json({ reviews: book_info.reviews });
});

router.put("/review", (req, res) => {
  // add a book review given authenticated user
  // Hint: You have to give a review as a request query & it must get posted with the username (stored in the session) posted.
  // If the same user posts a different review on the same ISBN, it should modify the existing review.
  // If another user logs in and posts a review on the same ISBN, it will get added as a different review under the same ISBN.

  let book_info = books[req.query.isbn];

  return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.books_router = router;
