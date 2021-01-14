const comments = require('express').Router();

const { getCommentsByPost, addComment, deleteComment } = require('../../queries/comments/comments');

comments.get("/comment/:postID", getCommentsByPost);

comments.post("/", addComment);

comments.delete("/:id", deleteComment);

module.exports = comments;