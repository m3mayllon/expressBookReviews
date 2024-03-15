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

router.put("/auth/review", (req, res) => {
  // add a user book review given authentication

  const username = "admin"; // TODO: get username from auth
  const { isbn, review } = req.query;

  // check if ISBN and review are provided
  if (!review || !isbn) {
    return res.status(400).json({ error: "ISBN and Review are required." });
  }

  // check if user has already reviewed the book
  if (books[isbn] && books[isbn].reviews && books[isbn].reviews[username]) {
    // update existing review if user has already reviewed the book
    books[isbn].reviews[username] = review;
  } else {
    // add new review if user has not reviewed the book yet
    if (!books[isbn]) {
      books[isbn] = { reviews: {} };
    }
    books[isbn].reviews[username] = review;
  }

  // fetch book reviews
  let book_info = books[isbn];

  return res.status(200).json({
    message: `'${username}' review has successfully been added/updated.`,
    reviews: book_info.reviews,
  });
});

router.delete("/auth/review", (req, res) => {
  // delete a user book review given authentication

  const username = "admin"; // TODO: get username from auth
  const isbn = req.query.isbn;

  // check if ISBN is provided
  if (!isbn) {
    return res.status(400).json({ error: "ISBN is required." });
  }

  // delete user review
  delete books[isbn].reviews[username];

  // fetch book reviews
  let book_info = books[isbn];

  res.status(200).json({
    message: `'${username}' review has successfully been deleted.`,
    reviews: book_info.reviews,
  });
});

module.exports.books_router = router;
