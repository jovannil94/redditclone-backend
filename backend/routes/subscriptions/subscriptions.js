const subscriptions = require('express').Router();

const { getUserSub, getSubCount, isUserSub, addSubscriber, deleteSubscriber  } = require('../../queries/subscriptions/subscriptions');

subscriptions.get("/user/:user_id", getUserSub);

subscriptions.get("/subreddit/:sub_id", getSubCount);

subscriptions.get("/usersubbed/:user_id/:sub_id", isUserSub);

subscriptions.post("/add", addSubscriber);

subscriptions.delete("/delete", deleteSubscriber);

module.exports = subscriptions;