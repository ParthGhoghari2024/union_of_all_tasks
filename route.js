const express = require("express");
var mainRouter = express.Router();
const registerPage = require("./controller/registerPage");
const { register } = require("./controller/api/register");
const { login } = require("./controller/api/login");
const loginPage = require("./controller/loginPage");
const activeUserPage = require("./controller/activeUserPage");
const forgotPasswordPage = require("./controller/forgotPasswordPage");
const { forgorPassword } = require("./controller/api/forgotPassword");
const { newPassword } = require("./controller/api/newPassword");
const homePage = require("./controller/homePage");
const { checkAuth } = require("./controller/api/checkAuth");
const { authorizationMiddleware } = require("./middleware/auth");
const logout = require("./controller/logout");
const kukucubePage = require("./controller/kukucubePage");
const dynamicTablePage = require("./controller/dynamicTablePage");
const ticTacToePage = require("./controller/tictactoePage");
const eventTablePage = require("./controller/eventTablePage");
const numbersortingPage = require("./controller/numberSortingPage");
const htmlTemplate1Page = require("./controller/htmlTemplate1Page");
const htmlTemplate2Page = require("./controller/htmlTemplate2Page");
const htmlTemplate3Page = require("./controller/htmlTemplate3Page");
const delimiterIndexPage = require("./controller/delimiter_search/indexPage");

const jobAppIndexPageRoute = require("./controller/job_app_crud/indexPage")
const { jobAppValidate } = require("./middleware/job_app_crud/jobAppMiddlewares");
const jobAppUpdateFormRoute = require("./controller/job_app_crud/updateForm");
const formPageRoute = require("./controller/job_app_crud/formPage");

const gridPage = require("./controller/dynamic_grid/gridPage");
const listAllStudents = require("./controller/student_grid/listAllStudents");
const listStudents = require("./controller/student_grid/listStudents");
const studentGridhomePage = require("./controller/student_grid/homePage");
const attendanceGrid = require("./controller/student_grid/attendanceGrid")
const resultGrid = require("./controller/student_grid/resultGrid");
const viewResult = require("./controller/student_grid/viewResult");
const multistepJobAppMiddleware = require("./middleware/multistep_jobapp/jobAppMiddlewares")
const multistepJobAppIndexPage = require("./controller/multistep_jobapp/indexPage");
const multistepInsert = require("./controller/api/multistep_jobapp/submitJobApp");
const { getJobAppData } = require("./controller/api/multistep_jobapp/getJobAppData");
const { updateForm } = require("./controller/api/multistep_jobapp/updateJobApp");
const multistepUpdate = require("./controller/api/multistep_jobapp/updateOnAtATime");


const fetchPostsHomePage = require("./controller/fetch_posts/homePage");
const fetchPostsPostPage = require("./controller/fetch_posts/postPage");
const fetchPostsPostDetailsPage = require("./controller/fetch_posts/postDetailsPage");
const postDetailsHomePage = require("./controller/fetch_posts/postDetailsHomePage");

mainRouter.route("/").get(loginPage);
mainRouter.route("/register").get(registerPage);
mainRouter.route("/activeUser").get(activeUserPage);
mainRouter.route("/forgotpassword").get(forgotPasswordPage)
mainRouter.route("/home").get(authorizationMiddleware, homePage);
mainRouter.route("/logout").get(authorizationMiddleware, logout);



mainRouter.route("/api/register").post(register);
mainRouter.route("/api/login").post(login);
mainRouter.route("/api/forgotpassword").post(forgorPassword);
mainRouter.route("/api/newPassword").post(newPassword);
mainRouter.route("/api/checkAuth").get(checkAuth);

mainRouter.route("/kukucube").get(authorizationMiddleware, kukucubePage)
mainRouter.route("/dynamictable").get(authorizationMiddleware, dynamicTablePage)
mainRouter.route("/tictactoe").get(authorizationMiddleware, ticTacToePage)
mainRouter.route("/eventtable").get(authorizationMiddleware, eventTablePage)
mainRouter.route("/numbersorting").get(authorizationMiddleware, numbersortingPage)
mainRouter.route("/html-template-1").get(authorizationMiddleware, htmlTemplate1Page)
mainRouter.route("/html-template-2").get(authorizationMiddleware, htmlTemplate2Page)
mainRouter.route("/html-template-3").get(authorizationMiddleware, htmlTemplate3Page)

mainRouter.route("/delimiter-search").get(authorizationMiddleware, delimiterIndexPage)


mainRouter.route("/job-application-form").get(authorizationMiddleware, jobAppIndexPageRoute)
mainRouter.route("/job-application-form/form").get(authorizationMiddleware, formPageRoute).post(authorizationMiddleware, jobAppValidate, formPageRoute);
mainRouter.route("/job-application-form/updateform").post(authorizationMiddleware, jobAppValidate, jobAppUpdateFormRoute);


mainRouter.route("/dynamic-grid").get(authorizationMiddleware, gridPage);


mainRouter.route("/student-grid").get(authorizationMiddleware, studentGridhomePage);
mainRouter.route("/student-grid/listAllStudents").get(authorizationMiddleware, listAllStudents)
mainRouter.route("/student-grid/listStudents").get(authorizationMiddleware, listStudents)
mainRouter.route("/student-grid/attendanceGrid").get(authorizationMiddleware, attendanceGrid)
mainRouter.route("/student-grid/resultGrid").get(authorizationMiddleware, resultGrid)
mainRouter.route("/student-grid/viewResult").get(authorizationMiddleware, viewResult)



mainRouter.route("/multistep-jobapp/").get(authorizationMiddleware, multistepJobAppIndexPage);


mainRouter.route("/multistep-jobapp/api/submitJobApp").post(authorizationMiddleware, multistepJobAppMiddleware.jobAppValidate, multistepInsert.insertForm);//for whole insert at once
mainRouter.route("/multistep-jobapp/api/getJobAppData").post(authorizationMiddleware, getJobAppData);
mainRouter.route("/multistep-jobapp/api/updateJobApp").post(authorizationMiddleware, multistepJobAppMiddleware.jobAppValidate, updateForm);


mainRouter.route("/fetch-posts/").get(authorizationMiddleware, fetchPostsHomePage);
mainRouter.route("/fetch-posts/posts").get(authorizationMiddleware, fetchPostsPostPage);
mainRouter.route("/fetch-posts/posts-details/").get(authorizationMiddleware, postDetailsHomePage);
mainRouter.route("/fetch-posts/posts-details/:id").get(authorizationMiddleware, fetchPostsPostDetailsPage);



//for step by step form submit(temp)
mainRouter.route("/multistep-jobapp/api/insertBasicDetails").post(authorizationMiddleware, multistepInsert.insertBasicDetailsRoute);
mainRouter.route("/multistep-jobapp/api/insertEduDetails").post(authorizationMiddleware, multistepInsert.insertEduDetailsRoute);
mainRouter.route("/multistep-jobapp/api/insertWorkDetails").post(authorizationMiddleware, multistepInsert.insertWorkExpDetailsRoute);
mainRouter.route("/multistep-jobapp/api/insertLanguageDetails").post(authorizationMiddleware, multistepInsert.insertLanguageDetailsRoute);
mainRouter.route("/multistep-jobapp/api/insertTechDetails").post(authorizationMiddleware, multistepInsert.insertTechDetailsRoute);
mainRouter.route("/multistep-jobapp/api/insertReferencesDetails").post(authorizationMiddleware, multistepInsert.insertReferenceDetailsRoute);
mainRouter.route("/multistep-jobapp/api/insertPreferencesDetails").post(authorizationMiddleware, multistepInsert.insertPreferenceDetailsRoute);
mainRouter.route("/multistep-jobapp/api/updateBasicDetails").post(authorizationMiddleware, multistepUpdate.updateBasicDetailsController);
mainRouter.route("/multistep-jobapp/api/updateEduDetails").post(authorizationMiddleware, multistepUpdate.updateEduDetailsController);
mainRouter.route("/multistep-jobapp/api/updateWorkDetails").post(authorizationMiddleware, multistepUpdate.updateWorkExpDetailsController);
mainRouter.route("/multistep-jobapp/api/updateLanguageDetails").post(authorizationMiddleware, multistepUpdate.updateLanguageDetailsController);
mainRouter.route("/multistep-jobapp/api/updateTechDetails").post(authorizationMiddleware, multistepUpdate.updateTechDetailsController);
mainRouter.route("/multistep-jobapp/api/updateReferencesDetails").post(authorizationMiddleware, multistepUpdate.updateReferenceDetailsController);
mainRouter.route("/multistep-jobapp/api/updatePreferencesDetails").post(authorizationMiddleware, multistepUpdate.updatePreferenceDetailsController);






module.exports = mainRouter;