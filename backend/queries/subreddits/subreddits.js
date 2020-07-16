const db = require("../../db/index");

const getUsers = async (req, res, next) => {
    try {
        let users = await db.any(`SELECT * FROM users`);
        res.status(200).json({
            status: "Success",
            message: "all users",
            payload: users
        })
    } catch (err){
        res.status(400).json({
            status: "Error",
            message: "Couldn't get all users",
            payload: err
        })
        next()
    }
}

const logInUser = async (req, res, next) => {
    try{
        let user = await db.one(
            `SELECT * FROM users WHERE user_name = '${req.body.user_name}' AND password = '${req.body.password}'`
            );
            res.status(200).json({
                status: "Success",
                message: "user logged in",
                payload: user
            })
    } catch (err){
        res.status(400).json({
            status: "Error",
            message: "Couldn't log in user",
            payload: err
        })
        next(err);
    }
}

const getUserId = async (req, res, next) => {
    try {
        let user = await db.one(`SELECT * FROM users WHERE id = '${req.params.id}'`);
        res.status(200).json({
          status: "Success",
          message: "user retrieved by id",
          payload: user
        });
      } catch (err){
        res.status(400).json({
            status: "Error",
            message: "Couldn't get user by id",
            payload: err
        })
        next(err);
      }
}

const getUserUsername = async (req, res, next) => {
    try {
        let user = await db.any(
          `SELECT * FROM users WHERE user_name LIKE '${req.params.user_name}%'`
        );
        res.status(200).json({
          status: "Success",
          message: "Grabbed user by user_name",
          payload: user
        });
      } catch (err){
        res.status(400).json({
            status: "Error",
            message: "Couldn't get user by user_name",
            payload: err
        })
        next(err);
      }
}

const addUser = async (req, res, next) => {
    try {
        let user = await db.one(
            `INSERT INTO users (user_name, email, password) VALUES('${req.body.user_name}', '${req.body.email}', '${req.body.password}') RETURNING *`)
        res.status(200).json({
            user,
            status: "Success",
            message: "Added user"
        })
    } catch (err){
        res.status(400).json({
            status: "Error",
            message: "User not added",
            payload: err
        })
        next()
    }
}

const deleteUser = async (req, res, next) => {
    try {
        await db.none(`DELETE from users WHERE id = ${req.params.id}`);
        res.status(200).json({
          status: "Success",
          message: "User Has Been Deleted"
        });
      } catch (err){
        res.status(400).json({
            status: "Error",
            message: "User not deleted",
            payload: err
        })
        next(err);
      }
}



module.exports = { getUsers, logInUser, getUserId, getUserUsername, addUser, deleteUser };
