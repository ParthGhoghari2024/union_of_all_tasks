const express = require("express");
var mainRouter = express.Router();
const indexPageRoute = require("./indexPage");
const { insertBasicDetailsRoute, insertForm, insertEduDetailsRoute, insertWorkExpDetailsRoute, insertLanguageDetailsRoute, insertTechDetailsRoute, insertPreferenceDetailsRoute, insertReferenceDetailsRoute } = require("../api/multistep_jobapp/submitJobApp");
const { getJobAppData } = require("../api/multistep_jobapp/getJobAppData");
const { updateForm } = require("../api/multistep_jobapp/updateJobApp");
const { updateBasicDetailsRoute, updateEduDetailsRoute, updateWorkExpDetailsRoute, updateLanguageDetailsRoute, updateTechDetailsRoute, updatePreferenceDetailsRoute, updateReferenceDetailsRoute } = require("../api/multistep_jobapp/updateOnAtATime");

mainRouter.route("/").get(indexPageRoute);


mainRouter.route("/api/submitJobApp").post(insertForm);//for whole insert at once
mainRouter.route("/api/getJobAppData").post(getJobAppData);
mainRouter.route("/api/updateJobApp").post(updateForm);

//for step by step form submit
mainRouter.route("/api/insertBasicDetails").post(insertBasicDetailsRoute);
mainRouter.route("/api/insertEduDetails").post(insertEduDetailsRoute);
mainRouter.route("/api/insertWorkDetails").post(insertWorkExpDetailsRoute);
mainRouter.route("/api/insertLanguageDetails").post(insertLanguageDetailsRoute);
mainRouter.route("/api/insertTechDetails").post(insertTechDetailsRoute);
mainRouter.route("/api/insertReferencesDetails").post(insertReferenceDetailsRoute);
mainRouter.route("/api/insertPreferencesDetails").post(insertPreferenceDetailsRoute);


mainRouter.route("/api/updateBasicDetails").post(updateBasicDetailsRoute);
mainRouter.route("/api/updateEduDetails").post(updateEduDetailsRoute);
mainRouter.route("/api/updateWorkDetails").post(updateWorkExpDetailsRoute);
mainRouter.route("/api/updateLanguageDetails").post(updateLanguageDetailsRoute);
mainRouter.route("/api/updateTechDetails").post(updateTechDetailsRoute);
mainRouter.route("/api/updateReferencesDetails").post(updateReferenceDetailsRoute);
mainRouter.route("/api/updatePreferencesDetails").post(insertPreferenceDetailsRoute);



module.exports = mainRouter;