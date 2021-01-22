const db = require("../../db/index");

const getVotesbyPost = async (req, res, next) => {
    try {
        let allUpVotes = await db.any(`SELECT count(vote_type) FROM votes WHERE post_id=$/post_id/ GROUP BY vote_type HAVING vote_type='up'`, {
            post_id:req.params.id
        });
        let allDownVotes = await db.any(`SELECT count(vote_type) FROM votes WHERE post_id=$/post_id/ GROUP BY vote_type HAVING vote_type='down'`, {
            post_id:req.params.id
        });
        res.status(200).json({
            status: "Success",
            message: "all votes for post",
            payload: {allUpVotes, allDownVotes}
        });
    } catch (err){
        res.status(400).json({
            status: "Error",
            message: "Couldn't get all votes",
            payload: err
        })
        next(err)
    }
}

const addVote = async (req, res, next) => {
    try {
        let vote = await db.none(
            `INSERT INTO votes (user_id, post_id) VALUES('${req.body.user_id}', '${req.body.post_id}') RETURNING *`)
        res.status(200).json({
            status: "Success",
            message: "Added vote",
            payload: vote
        })
    } catch (err){
        res.status(400).json({
            status: "Error",
            message: "Vote not added",
            payload: err
        })
        next()
    }
}

const deleteVote = async (req, res, next) => {
    try {
        await db.none(`DELETE from votes WHERE user_id = ${req.params.user_id} AND post_id = ${req.params.post_id}`);
        res.status(200).json({
          status: "Success",
          message: "Post Has Been Deleted"
        });
      } catch (err){
        res.status(400).json({
            status: "Error",
            message: "Post not deleted",
            payload: err
        })
        next(err);
      }
}



module.exports = { getVotesbyPost, addVote, deleteVote };
