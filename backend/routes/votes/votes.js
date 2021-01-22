const votes = require('express').Router();

const { getVotesbyPost, getVotesbyComment, addVote, deleteVote, updateVoteUpComment, updateVoteDownComment } = require('../../queries/votes/votes');

votes.get("/post/:post_id", getVotesbyPost);

votes.post("/add", addVote);

votes.delete("/delete", deleteVote);

votes.get("/comment/:comment_id", getVotesbyComment);

votes.patch("/upvote/comment/:comment_id", updateVoteUpComment);

votes.patch("/downvote/comment/:comment_id", updateVoteDownComment);

module.exports = votes;