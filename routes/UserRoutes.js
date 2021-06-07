const express = require("express");
const User = require("../models/User");
const UserRouter = express.Router();

UserRouter.get("/", (req, res) => {
    User.find({})
        .then(users => {
            res.json({
                success:true,
                users
            });
        });
});

UserRouter.post("/");


module.exports = UserRouter;
