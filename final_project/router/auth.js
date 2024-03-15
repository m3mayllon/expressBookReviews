const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

let authenticatedUser = require("./dependencies.js").authenticatedUser;

// log in authenticated users
router.post("/login", (req, res) => {
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
      .status(401)
      .json({ message: "Unauthorized. Please check username and password." });
  }

  // create JWT token and store username in session
  let accessToken = jwt.sign({ data: password }, "access", { expiresIn: 60 });
  req.session.authorization = { accessToken, username };

  return res.status(200).send("User successfully logged in.");
});

module.exports.auth_router = router;
