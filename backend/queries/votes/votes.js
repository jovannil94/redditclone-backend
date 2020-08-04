const db = require("../../db/index");

const getVotes = async (req, res, next) => {
    try {
        let countVotes = await db.any(`SELECT COUNT(id) FROM votes WHERE post_id=${req.params.post_id}`);
        let user = await db.any(`SELECT user_id, user_name FROM users JOIN votes ON users.id = votes.user_id WHERE post_id = ${req.params.post_id}`);
        res.status(200).json({
            status: "Success",
            message: "all votes",
            payload: {countVotes, user}
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



module.exports = { getVotes, addVote, deleteVote };
