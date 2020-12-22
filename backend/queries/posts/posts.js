const db = require("../../db/index");

const getPosts = async (req, res, next) => {
    try {
        let posts = await db.any(`SELECT posts.id, posts.user_id, posts.sub_id, posts.title, posts.body, posts.image, users.user_name, subreddits.subname FROM posts LEFT JOIN users ON posts.user_id = users.id LEFT JOIN subreddits ON posts.sub_id = subreddits.id ORDER BY id DESC`);
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
        let posts = await db.any(`SELECT posts.id, posts.user_id, posts.sub_id, posts.title, posts.body, posts.image, users.user_name, subreddits.subname FROM subreddits LEFT JOIN posts ON subreddits.id = posts.sub_id LEFT JOIN users ON posts.user_id = users.id WHERE subreddits.id=$/sub_id/ ORDER BY id DESC`, {
            sub_id: req.params.id
        });
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
            `INSERT INTO posts (user_id, sub_id, title, body)
             VALUES($/user_id/, $/sub_id/, $/body.title/, $/body.context/)
             RETURNING *`, {
                user_id: req.body.user_id,
                sub_id: req.body.sub_id,
                body: {title: req.body.title, context: req.body.context}
            })
        res.status(200).json({
            user,
            status: "Success",
            message: "Added post"
        })
    } catch (err){
        console.log(err)
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
        await db.none(`DELETE from posts WHERE id = ${post.id}`);
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
