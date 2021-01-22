const votes = require('express').Router();

const { getVotesbyPost, addVote, deleteVote } = require('../../queries/votes/votes');

votes.get("/post/:post_id", getVotesbyPost);

votes.post("/:post_id", addVote);

votes.delete("/:post_id", deleteVote);

module.exports = votes;