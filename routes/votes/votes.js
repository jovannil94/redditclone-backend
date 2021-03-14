const votes = require('express').Router();

const { getVotes, checkVote, addVote, deleteVote, updateVote } = require('../../queries/votes/votes');

votes.post("/count", getVotes);

votes.post("/check", checkVote);

votes.post("/add", addVote);

votes.delete("/delete", deleteVote);

votes.patch("/changevote", updateVote);

module.exports = votes;