const db = require("../../db/index");

const getCommentsByPost = async (req, res, next) => {
    try {
        let comments = await db.any(`SELECT * FROM comments WHERE post_id=$/post_id/ LEFT JOIN users ON comments.user_id = users.id ORDER BY id DESC`);
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
            `INSERT INTO comments (user_id, post_id, body)
             VALUES($/user_id/, $/post_id/, $/body.context/)
             RETURNING *`, {
                user_id: req.body.user_id,
                post_id: req.body.post_id,
                body: {context: req.body.context}
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
