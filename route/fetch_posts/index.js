const express = require("express");
var mainRouter = express.Router();
const postPageRoute = require("./postPage");
const postDetailsPage = require("./postDetailsPage");
mainRouter.route("/").get((req,res)=>{
    res.redirect("/fetch-posts/posts")
});

mainRouter.route("/posts").get(postPageRoute);
mainRouter.route("/posts-details/").get((req,res)=>{
    res.redirect("/fetch-posts/posts-details/1");
});

mainRouter.route("/posts-details/:id").get(postDetailsPage);




module.exports = mainRouter;