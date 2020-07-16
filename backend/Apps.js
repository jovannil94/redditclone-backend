const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT;
const usersRouter= require('./routes/users/users');
const subredditsRouter= require('./routes/subreddits/subreddits');
const postsRouter= require('./routes/posts/posts');
const votesRouter= require('./routes/votes/votes');
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/users", usersRouter);
app.use("/subreddits", subredditsRouter);
app.use("/posts", postsRouter);
app.use("/votes", votesRouter);


app.use((err, req, res, next) => {
    console.log(err);
    if(err.status) {
        res.status(err.status).json(err);
    } else {
        res.status(500).json(err)
    }
})

app.listen(PORT, () => {
    console.log("Listening to port ", PORT);
})