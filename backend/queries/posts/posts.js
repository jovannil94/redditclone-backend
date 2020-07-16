const db = require("../../db/index");

const getPosts = async (req, res, next) => {
    try {
        let posts = await db.any(`SELECT * FROM posts`);
        res.status(200).json({
            status: "Success",
            message: "all posts",
            payload: posts
        })
    } catch (err){
        res.status(400).json({
            status: "Error",
            message: "Couldn't get all posts",
            payload: err
        })
        next()
    }
}

const getPostBySub = async (req, res, next) => {
    try {
        let posts = await db.one(`SELECT * FROM posts LEFT JOIN subreddits ON posts.subreddits_id = subreddits.id WHERE subreddits.id='${req.params.id}'`);
        res.status(200).json({
          status: "Success",
          message: "posts retrieved by sub",
          payload: posts
        });
      } catch (err){
        res.status(400).json({
            status: "Error",
            message: "Couldn't get posts by sub",
            payload: err
        })
        next(err);
      }
}

const addPost = async (req, res, next) => {
    try {
        let user = await db.one(
            `INSERT INTO posts (user_id, subreddits_id, body) VALUES('${req.body.user_id}', '${req.body.subreddits_id}', '${req.body.title}', '${req.body.body}') RETURNING *`)
        res.status(200).json({
            user,
            status: "Success",
            message: "Added post"
        })
    } catch (err){
        res.status(400).json({
            status: "Error",
            message: "Post not added",
            payload: err
        })
        next()
    }
}

const deletePost = async (req, res, next) => {
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



module.exports = { getPosts, getPostBySub, addPost, deletePost };
