const votes = require('express').Router();

const { getVotes, addVote, deleteVote, updateVote } = require('../../queries/votes/votes');

votes.get("/count", getVotes);

votes.post("/add", addVote);

votes.delete("/delete", deleteVote);

votes.patch("/changevote", updateVote);

module.exports = votes;