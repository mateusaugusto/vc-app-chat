import express = require("express");
let userRouter = express.Router();

userRouter.get("/user", function(req, res) {
    console.log("user");
});

export = userRouter;
