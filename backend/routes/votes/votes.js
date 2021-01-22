const votes = require('express').Router();

const { getVotesbyPost, getVotesbyComment, addVote, deleteVote, updateVoteUp, updateVoteDown } = require('../../queries/votes/votes');

votes.get("/post/:id", getVotesbyPost);

votes.get("/comment/:id", getVotesbyComment);

votes.post("/:id", addVote);

votes.delete("/:id", deleteVote);

votes.patch("/upvote/:id", updateVoteUp);

votes.patch("/downvote/:id", updateVoteDown);

module.exports = votes;