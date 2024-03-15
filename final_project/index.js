const express = require("express");
const session = require("express-session");

const auth_router = require("./router/auth.js").auth_router;
const books_router = require("./router/books.js").books_router;
const users_router = require("./router/users.js").users_router;

const app = express();

app.use(express.json());

app.use(
  session({
    secret: "fingerprint_customer",
    resave: true,
    saveUninitialized: true,
  })
);

app.use("/auth/*", function auth(req, res, next) {
  // check JWT authentication

  if (!req.session.authorization) {
    return res.status(403).json({ message: "User not logged in" });
  }

  // parse token and validate authorization
  token = req.session.authorization["accessToken"];
  jwt.verify(token, "access", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "User not authenticated" });
    }
    req.user = user;
    next();
  });
});

const PORT = 5000;

app.use("/", auth_router);
app.use("/", books_router);
app.use("/", users_router);

app.listen(PORT, () => console.log("Server is running"));
