const db = require("../../db/index");

const getVotesbyPost = async (req, res, next) => {
    try {
        let allUpVotes = await db.any(`
        SELECT count(vote_type) 
        FROM votes 
        WHERE post_id=$/post_id/ 
        GROUP BY vote_type 
        HAVING vote_type='up'`, {
            post_id:req.params.post_id
        });
        let allDownVotes = await db.any(`SELECT count(vote_type) FROM votes WHERE post_id=$/post_id/ GROUP BY vote_type HAVING vote_type='down'`, {
            post_id:req.params.post_id
        });
        let upCountTotal
        let downCountTotal
        if(allUpVotes.length === 0) {
            upCountTotal = 0
        } else {
            upCountTotal = allUpVotes[0].count
        }

        if(allDownVotes.length === 0) {
            downCountTotal = 0
        } else {
            downCountTotal = allDownVotes[0].count
        }
        let voteCount = (upCountTotal - downCountTotal)
        res.status(200).json({
            status: "Success",
            message: "all votes for post",
            payload: voteCount
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

const getVotesbyComment = async (req, res, next) => {
    try {
        let allUpVotes = await db.any(`
        SELECT count(vote_type) 
        FROM votes 
        WHERE comment_id=$/comment_id/ 
        GROUP BY vote_type 
        HAVING vote_type='up'`, {
            comment_id:req.params.comment_id
        });
        let allDownVotes = await db.any(`SELECT count(vote_type) FROM votes WHERE comment_id=$/comment_id/ GROUP BY vote_type HAVING vote_type='down'`, {
            comment_id:req.params.comment_id
        });
        let upCountTotal
        let downCountTotal
        if(allUpVotes.length === 0) {
            upCountTotal = 0
        } else {
            upCountTotal = allUpVotes[0].count
        }

        if(allDownVotes.length === 0) {
            downCountTotal = 0
        } else {
            downCountTotal = allDownVotes[0].count
        }
        let voteCount = (upCountTotal - downCountTotal)
        res.status(200).json({
            status: "Success",
            message: "all votes for comment",
            payload: voteCount
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
            `INSERT INTO votes (user_id, post_id, comment_id, vote_type)
            VALUES($/user_id/, $/post_id/, $/comment_id/, $/vote_type/)
            RETURNING *`, {
               user_id: req.body.user_id,
               post_id: req.body.post_id,
               comment_id: req.body.comment_id,
               vote_type: req.body.vote_type,
           })
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
        await db.none(`DELETE from votes WHERE user_id = $/user_id/ AND post_id = $/post_id/`, {
            user_id: req.params.user_id,
            post_id: req.params.post_id
        });
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

const updateVoteUp = async (req, res, next) => {
    try {
        await db.none(`
        UPDATE votes
        SET vote_type = 'up' 
        WHERE comment_id=$/comment_id/`, {
            comment_id: req.body.comment_id
        });
        res.status(200).json({
            status: "Success",
            message: "Vote Has Been updated to upvote"
          });
    } catch (error) {
        res.status(400).json({
            status: "Error",
            message: "Vote not updated",
            payload: err
        })
        next(err);
    }
}

const updateVoteDown = async (req, res, next) => {
    try {
        await db.none(`
        UPDATE votes
        SET vote_type = 'down' 
        WHERE comment_id=$/comment_id/`, {
            comment_id: req.body.comment_id
        });
        res.status(200).json({
            status: "Success",
            message: "Vote Has Been updated to downvote"
          });
    } catch (error) {
        res.status(400).json({
            status: "Error",
            message: "Vote not updated",
            payload: err
        })
        next(err);
    }
}



module.exports = { getVotesbyPost, getVotesbyComment, addVote, deleteVote, updateVoteUp, updateVoteDown };
