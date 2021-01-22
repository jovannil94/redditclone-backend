const votes = require('express').Router();

const { getVotesbyPost, getVotesbyComment, addVote, deleteVote, updateVote } = require('../../queries/votes/votes');

votes.get("/post/:post_id", getVotesbyPost);

votes.post("/add", addVote);

votes.delete("/delete", deleteVote);

votes.get("/comment/:comment_id", getVotesbyComment);

votes.patch("/changevote", updateVote);

module.exports = votes;