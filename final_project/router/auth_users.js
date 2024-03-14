const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const userExists = (username) => {
  // check if username exists in the users array
  return users.some((user) => user.username === username);
};

const registerUser = (username, password) => {
  // add user object (username and password) to the users array
  const newUser = { username, password };
  users.push(newUser);
};

const authenticatedUser = (username, password) => {
  //returns boolean
  //write code to check if username and password match the one we have in records.
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.authenticated = regd_users;
module.exports.userExists = userExists;
module.exports.registerUser = registerUser;
module.exports.users = users;
