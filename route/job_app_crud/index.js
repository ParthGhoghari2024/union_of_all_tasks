const express = require("express");
var mainRouter = express.Router();
const formPageRoute = require("./formPage");
const indexPageRoute = require("./indexPage")
const {jobAppValidate} = require("../../middleware/job_app_crud/jobAppMiddlewares"); 
const updateFormRoute = require("./updateForm");

mainRouter.route("/").get(indexPageRoute);
mainRouter.route("/form").get(formPageRoute).post(jobAppValidate,formPageRoute);
mainRouter.route("/updateform").post(jobAppValidate,updateFormRoute);

// mainRouter.route("/updateform").post(updateFormRoute);


module.exports = mainRouter;