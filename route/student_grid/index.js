const express = require("express");
var mainRouter = express.Router();
const listAllStudentsRoute = require("./listAllStudents");
const listStudentsRoute = require("./listStudents");
const homePageRoute = require("./homePage");
const attendanceGridRoute = require("./attendanceGrid")
const resultGridRoute = require("./resultGrid");
const viewResult = require("./viewResult");
mainRouter.route("/").get(homePageRoute);
mainRouter.route("/listAllStudents").get(listAllStudentsRoute)
mainRouter.route("/listStudents").get(listStudentsRoute)
mainRouter.route("/attendanceGrid").get(attendanceGridRoute)
mainRouter.route("/resultGrid").get(resultGridRoute)
mainRouter.route("/viewResult").get(viewResult)
module.exports = mainRouter;