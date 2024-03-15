const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

let authenticatedUser = require("./dependencies.js").authenticatedUser;

router.post("/login", (req, res) => {
  // log in authenticated users
  const { username, password } = req.body;

  // check if username and password are provided
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }

  // check if user is authenticated
  if (!authenticatedUser(username, password)) {
    return res
      .status(201)
      .json({ message: "Unauthorized. Please check username and password." });
  }

  // create JWT token
  let accessToken = jwt.sign({ data: password }, "access", { expiresIn: 60 });
  req.session.authorization = { accessToken, username };

  return res.status(200).send("User successfully logged in.");
});

module.exports.auth_router = router;
