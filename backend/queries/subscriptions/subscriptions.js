const db = require("../../db/index");

const getUserSub = async (req, res, next) => {
    try {
        let subscriptions = await db.any(`
            SELECT subscriptions.id,subreddits.subname 
            FROM subscriptions 
            LEFT JOIN subreddits ON subscriptions.sub_id = subreddits.id 
            WHERE subscriptions.user_id = $/user_id/`, {
                user_id: req.params.user_id
        });
        res.status(200).json({
          status: "Success",
          message: "All subs for User",
          payload: subscriptions
        });
      } catch (err){
        res.status(400).json({
            status: "Error",
            message: "Couldn't get subscriptions",
            payload: err
        })
        next(err);
      }
}

const getSubCount = async (req, res, next) => {
    try {
        let count = await db.one(
            `SELECT count(id) 
            FROM subscriptions 
            WHERE sub_id = $/sub_id/`, {
                sub_id: req.params.sub_id
        });
         res.status(200).json({
                status: "Success",
                message: "Count of all subscribers",
                payload: count
        });
    } catch (err){
        res.status(400).json({
            status: "Error",
            message: "Couldn't get count of subscribers",
            payload: err
        })
        next(err);
      }
}

const isUserSub = async (req, res, next) => {
    try {
        let didSub = await db.any(`
        SELECT * FROM subscriptions
        WHERE user_id = $/user_id/ 
        AND sub_id = $/sub_id/`, {
            user_id: req.body.user_id,
            sub_id: req.body.sub_id
        });
        res.status(200).json({
            status: "Success",
            message: "User did sub",
            payload: didSub
        })
    } catch (err) {
        res.status(400).json({
            status: "Error",
            message: "User did not sub",
            payload: err
        })
        next()
    }
}


const addSubscriber = async (req, res, next) => {
    try {
        let subscribed = await db.one(
            `INSERT INTO subscriptions (user_id, sub_id) 
            VALUES($/user_id/, $/sub_id/) 
            RETURNING *`, {
                user_id: req.body.user_id,
                sub_id: req.body.sub_id
            })
        res.status(200).json({
            subscribed,
            status: "Success",
            message: `Subscribed to sub`
        })
    } catch (err){
        res.status(400).json({
            status: "Error",
            message: "Wasn't subscribed to subreddit",
            payload: err
        })
        next()
    }
}

const deleteSubscriber = async (req, res, next) => {
    try {
        await db.none(`
        DELETE from subscriptions 
        WHERE user_id = $/user_id/ 
        AND sub_id = $/sub_id/`, {
            user_id: req.body.user_id,
            sub_id: req.body.sub_id
        });
        res.status(200).json({
          status: "Success",
          message: `User was unsubscribed`,
        });
      } catch (err){
        res.status(400).json({
            status: "Error",
            message: "User was not unsubscribed",
            payload: err
        })
        next(err);
      }
}



module.exports = { getUserSub, getSubCount, isUserSub, addSubscriber, deleteSubscriber };
