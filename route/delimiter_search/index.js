const express = require("express");
var mainRouter = express.Router();
const indexPageRoute = require("./indexPage");
mainRouter.route("/").get(indexPageRoute);

module.exports = mainRouter;