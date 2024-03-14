const express = require("express");
let books = require("./booksdb.js");
let userExists = require("./auth_users.js").userExists;
let registerUser = require("./auth_users.js").registerUser;
const public_users = express.Router();

/* USERS */
/* USERS */
/* USERS */
public_users.post("/register", (req, res) => {
  // register a new user given username and password
  const { username, password } = req.body;

  // check if username and password are provided
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }

  // check if username already exists
  if (userExists(username)) {
    return res
      .status(409)
      .json({ error: `Username '${username}' already exists.` });
  }

  // proceed with registration
  registerUser(username, password);

  res.status(200).json({
    message: `Username '${username}' has successfully been registered.`,
  });
});

/* BOOKS */
/* BOOKS */
/* BOOKS */
public_users.get("/", function (req, res) {
  // return book list available in the shop
  return res.status(200).json(books);
});

public_users.get("/author", function (req, res) {
  // return all books based on author
  const author = req.query.author;

  // filter out books
  let booksArray = Object.values(books);
  let filtered_books = booksArray.filter((book) => book.author === author);

  return res.status(200).json(filtered_books);
});

public_users.get("/title", function (req, res) {
  // return all books based on title
  const title = req.query.title;

  // filter out books
  let booksArray = Object.values(books);
  let filtered_books = booksArray.filter((book) => book.title === title);

  return res.status(200).json(filtered_books);
});

public_users.get("/isbn", function (req, res) {
  // return book details based on ISBN
  let book_info = books[req.query.isbn];

  // check if book exists
  if (!book_info) {
    return res.status(200).json({});
  }

  return res.status(200).json(book_info);
});

public_users.get("/review", function (req, res) {
  // return book reviews based on ISBN
  let book_info = books[req.query.isbn];

  // check if book exists
  if (!book_info) {
    return res.status(200).json({});
  }

  return res.status(200).json({ reviews: book_info.reviews });
});

module.exports.general = public_users;
