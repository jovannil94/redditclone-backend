const comments = require('express').Router();

const { getCommentsByPost, addComment, deleteComment } = require('../../queries/comments/comments');

comments.get("/:id", getCommentsByPost);

comments.post("/", addComment);

comments.delete("/:id", deleteComment);

module.exports = comments;