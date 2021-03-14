const posts = require('express').Router();

const { getPosts, getPostById, getPostBySub, addPost, deletePost } = require('../../queries/posts/posts');

posts.get("/", getPosts);

posts.get("/post/:id", getPostById);

posts.get("/:id", getPostBySub);

posts.post("/", addPost);

posts.delete("/:id", deletePost);

module.exports = posts;