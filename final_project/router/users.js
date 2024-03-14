const express = require("express");
const public_users = express.Router();

let userExists = require("./dependencies.js").userExists;
let registerUser = require("./dependencies.js").registerUser;

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
