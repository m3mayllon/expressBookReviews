const express = require("express");
const session = require("express-session");

const auth_router = require("./router/auth.js").auth_router;
const books_router = require("./router/books.js").books_router;
const users_router = require("./router/users.js").users_router;

const app = express();

app.use(express.json());

app.use(
  "/customer",
  session({
    secret: "fingerprint_customer",
    resave: true,
    saveUninitialized: true,
  })
);

const PORT = 5000;

app.use("/customer", auth_router);
app.use("/", books_router);
app.use("/", users_router);

app.listen(PORT, () => console.log("Server is running"));
