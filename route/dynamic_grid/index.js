const express = require("express");
var mainRouter = express.Router();
const gridPageRoute = require("./gridPage");
mainRouter.route("/").get(gridPageRoute);


module.exports = mainRouter;