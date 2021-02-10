const users = require('express').Router();

const { getUsers, getUserId, getUserIDByEmail, addUser, deleteUser } = require('../../queries/users/users');

users.get("/", getUsers);

// users.post("/login", logInUser);

users.get("/:id", getUserId);

users.get("/search/:email", getUserIDByEmail);

users.post("/", addUser);

users.delete("/:id", deleteUser);

module.exports = users;