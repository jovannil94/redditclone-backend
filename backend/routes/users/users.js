const users = require('express').Router();

const { getUsers, logInUser, getUserId, getUserUsername, addUser, deleteUser } = require('../../queries/users/users');

users.get("/", getUsers);

users.post("/login", logInUser);

users.get("/:id", getUserId);

users.get("/search/:user_name", getUserUsername);

users.post("/", addUser);

users.delete("/:id", deleteUser);

module.exports = users;