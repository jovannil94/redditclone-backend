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
        await db.none(
            `INSERT INTO votes (user_id, post_id, comment_id, vote_type)
            VALUES($/user_id/, $/post_id/, $/comment_id/, $/vote_type/)`, {
               user_id: req.body.user_id,
               post_id: req.body.post_id,
               comment_id: req.body.comment_id,
               vote_type: req.body.vote_type,
           })
        res.status(200).json({
            status: "Success",
            message: "Added vote",
            payload: `${req.body.vote_type}vote added`
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
        await db.none(`DELETE from votes WHERE user_id = $/user_id/ AND (comment_id = $/comment_id/ OR post_id = $/post_id/)`, {
            post_id: req.body.post_id,
            comment_id: req.body.comment_id,
            user_id: req.body.user_id
        });
        res.status(200).json({
          status: "Success",
          message: "Post Has Been Deleted",
          payload: `Vote was removed`
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

const updateVoteUpComment = async (req, res, next) => {
    try {
        await db.none(`
        UPDATE votes
        SET vote_type = 'up' 
        WHERE comment_id=$/comment_id/`, {
            comment_id: req.params.comment_id
        });
        res.status(200).json({
            status: "Success",
            message: "Vote Has Been updated to upvote",
            payload: `comment ${req.params.comment_id} was updated to upvote`
          });
    } catch (err) {
        res.status(400).json({
            status: "Error",
            message: "Vote not updated",
            payload: err
        })
        next(err);
    }
}

const updateVote = async (req, res, next) => {
    try {
        await db.none(`
        UPDATE votes
        SET vote_type = '${req.body.vote_type}' 
        WHERE user_id = $/user_id/ AND (comment_id=$/comment_id/ OR post_id=$/post_id/)`, {
            user_id: req.body.user_id,
            comment_id: req.body.comment_id,
            post_id: req.body.post_id
        });
        res.status(200).json({
            status: "Success",
            message: `Vote Has Been updated to ${req.body.vote_type}`,
            payload: `${req.body.user_id} updated vote to ${req.body.vote_type}`
          });
    } catch (err) {
        res.status(400).json({
            status: "Error",
            message: "Vote not updated",
            payload: err
        })
        next(err);
    }
}



module.exports = { getVotesbyPost, getVotesbyComment, addVote, deleteVote, updateVoteUpComment, updateVote };
