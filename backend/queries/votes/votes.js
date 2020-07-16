const db = require("../../db/index");

const getVotes = async (req, res, next) => {
    try {
        let votes = await db.any(`SELECT * FROM votes`);
        res.status(200).json({
            status: "Success",
            message: "all votes",
            payload: votes
        })
    } catch (err){
        res.status(400).json({
            status: "Error",
            message: "Couldn't get all votes",
            payload: err
        })
        next()
    }
}

const addVote = async (req, res, next) => {
    try {
        let vote = await db.one(
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
        await db.none(`DELETE from posts WHERE id = ${req.params.id}`);
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



module.exports = { getVotes, addVote, deleteVote };
