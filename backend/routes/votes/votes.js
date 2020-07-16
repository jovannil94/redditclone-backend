const votes = require('express').Router();

const { getVotes, addVote, deleteVote } = require('../../queries/votes/votes');

votes.get("/", getVotes);

votes.post("/", addVote);

votes.delete("/:id", deleteVote);

module.exports = votes;