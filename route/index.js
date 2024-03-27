const express = require("express");
var mainRouter = express.Router();
const registerPage = require("./registerPage");
const { register } = require("./api/register");
const { login } = require("./api/login");
const loginPage = require("./loginPage");
const activeUserPage = require("./activeUserPage");
const forgotPasswordPage = require("./forgotPasswordPage");
const { forgorPassword } = require("./api/forgotPassword");
const { newPassword } = require("./api/newPassword");
const homePage = require("./homePage");
const { checkAuth } = require("./api/checkAuth");
const { authorizationMiddleware } = require("../middleware/auth");

mainRouter.route("/").get(loginPage);
mainRouter.route("/register").get(registerPage);
mainRouter.route("/activeUser").get(activeUserPage);
mainRouter.route("/forgotpassword").get(forgotPasswordPage)
mainRouter.route("/home").get(authorizationMiddleware,homePage);

mainRouter.route("/kukucube").get(authorizationMiddleware,(req,res)=>res.render("kukucube/"))
mainRouter.route("/dynamictable").get(authorizationMiddleware,(req,res)=>res.render("dynamictable/"))
mainRouter.route("/tictactoe").get(authorizationMiddleware,(req,res)=>res.render("tictactoe/"))
mainRouter.route("/eventtable").get(authorizationMiddleware,(req,res)=>res.render("eventtable/"))

mainRouter.route("/api/register").post(register);
mainRouter.route("/api/login").post(login);
mainRouter.route("/api/forgotpassword").post(forgorPassword);
mainRouter.route("/api/newPassword").post(newPassword);
mainRouter.route("/api/checkAuth").get(checkAuth);

mainRouter.use("/delimiter_search",authorizationMiddleware,require("../route/delimiter_search/index"));


module.exports = mainRouter;