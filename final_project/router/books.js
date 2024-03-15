const express = require("express");
const router = express.Router();

const {
  fetchBooks,
  fetchBooksByFilter,
  filterByAuthor,
  filterByISBN,
  filterByTitle,
} = require("../crud/books.js");

// return all books
router.get("/", async function (req, res) {
  try {
    const books = await fetchBooks();
    return res.status(200).json(books);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// return all books by author
router.get("/author", async function (req, res) {
  try {
    const booksByAuthor = await fetchBooksByFilter(
      filterByAuthor,
      req.query.author
    );
    return res.status(200).json(booksByAuthor);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// return all books by ISBN
router.get("/isbn", async function (req, res) {
  try {
    const booksByISBN = await fetchBooksByFilter(filterByISBN, req.query.isbn);
    return res.status(200).json(booksByISBN);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// return all books by title
router.get("/title", async function (req, res) {
  try {
    const booksByTitle = await fetchBooksByFilter(
      filterByTitle,
      req.query.title
    );
    return res.status(200).json(booksByTitle);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// return book reviews by ISBN
router.get("/review", async function (req, res) {
  try {
    const booksByISBN = await fetchBooksByFilter(filterByISBN, req.query.isbn);
    if (booksByISBN.length === 0) {
      return res.status(200).json(booksByISBN);
    }
    return res.status(200).json({ reviews: booksByISBN[0].reviews });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// add a user book review given authentication
router.put("/auth/review", (req, res) => {
  const username = req.session.authorization.username;
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

// delete a user book review given authentication
router.delete("/auth/review", (req, res) => {
  const username = req.session.authorization.username;
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
