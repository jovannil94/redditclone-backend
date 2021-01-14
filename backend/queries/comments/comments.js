const { timeStamp } = require("console");
const db = require("../../db/index");

const getCommentsByPost = async (req, res, next) => {
    try {
        let comments = await db.any(`SELECT comments.id, comments.body, comments.comment_date, users.user_name FROM comments LEFT JOIN users ON comments.user_id = users.id WHERE comments.post_id=$/post_id/ ORDER BY comments.id`, {
            post_id: req.params.id
        });
        res.status(200).json({
            status: "Success",
            message: "all comments",
            payload: comments
        })
    } catch (err){
        res.status(400).json({
            status: "Error",
            message: "Couldn't get all comments",
            payload: err
        })
        next()
    }
}

const addComment = async (req, res, next) => {
    try {
        let user = await db.one(
            `INSERT INTO comments (user_id, post_id, body, comment_date)
             VALUES($/user_id/, $/post_id/, $/body.context/, $/comment_date/)
             RETURNING *`, {
                user_id: req.body.user_id,
                post_id: req.body.post_id,
                body: {context: req.body.context},
                comment_date: new Date().toLocaleDateString()
            })
        res.status(200).json({
            user,
            status: "Success",
            message: "Added comment"
        })
    } catch (err){
        console.log(err)
        res.status(400).json({
            status: "Error",
            message: "Comment not added",
            payload: err
        })
        next()
    }
}

const deleteComment = async (req, res, next) => {
    try {
        await db.none(`DELETE from comments WHERE id = $/comment.id/`);
        res.status(200).json({
          status: "Success",
          message: "Comment Has Been Deleted"
        });
      } catch (err){
        res.status(400).json({
            status: "Error",
            message: "Comment not deleted",
            payload: err
        })
        next(err);
      }
}

module.exports = { getCommentsByPost, addComment, deleteComment };
