const votes = require('express').Router();

const { getVotes, addVote, deleteVote } = require('../../queries/votes/votes');

votes.get("/:post_id", getVotes);

votes.post("/:post_id", addVote);

votes.delete("/:post_id", deleteVote);

module.exports = votes;