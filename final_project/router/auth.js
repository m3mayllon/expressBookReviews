const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// app.use("/customer/auth/*", function auth(req, res, next) {
//   //Write the authenication mechanism here
// });

router.post("/login", (req, res) => {
  // log in authenticated users
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.auth_router = router;
