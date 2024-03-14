let users = require("../database/users.js");

const authenticatedUser = (username, password) => {
  // check if user object (username and password) is authenticated
  const user = users.find((user) => user.username === username);
  return user && user.password === password;
};

const userExists = (username) => {
  // check if username exists in the users array
  return users.some((user) => user.username === username);
};

const registerUser = (username, password) => {
  // add user object (username and password) to the users array
  const newUser = { username, password };
  users.push(newUser);
};

module.exports.authenticatedUser = authenticatedUser;
module.exports.userExists = userExists;
module.exports.registerUser = registerUser;
module.exports.users = users;
