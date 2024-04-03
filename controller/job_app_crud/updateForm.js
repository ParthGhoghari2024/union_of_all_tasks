const { updateBasicDetails } = require("../../helper/job_app_crud/dbHelperBasicDetails");
const { updateEducationDetails } = require("../../helper/job_app_crud/dbHelperEducationDetails");
const { updateLanguageDetails } = require("../../helper/job_app_crud/dbHelperLanguageDetails");
const { updatePreferenceDetails } = require("../../helper/job_app_crud/dbHelperPreferenceDetails");
const { updateReferenceDetails } = require("../../helper/job_app_crud/dbHelperReferenceDetails");
const { updateTechDetails } = require("../../helper/job_app_crud/dbHelperTechDetails");
const { updateWorkExpDetails } = require("../../helper/job_app_crud/dbHelperWorkExpDetails");

async function updateForm(req, res) {
	try {
		// console.log(req.body);
		var basicDetailsObj = {
			firstName: req.body.firstname || '',
			lastName: req.body.lastname || '',
			designation: req.body.designation || '',
			address1: req.body.address1 || '',
			address2: req.body.address2 || '',
			email: req.body.email || '',
			phoneNumber: req.body.phone || '',
			city: req.body.city || '',
			gender: req.body.gender === "male" ? 'm' : 'f' || '',
			state: req.body.state || '',
			relationshipStatus: req.body.relationship_status === "single" ? 's' : 'm' || '',
			dob: new Date(req.body.dob) || '',
		}


		var queryId = req.query.id;
		if (!queryId) {
			res.send("invalid or empty id");
			return;
		}
		var updateBasicDetailsResult = await updateBasicDetails(Object.values(basicDetailsObj), queryId)

		// console.log(updateBasicDetailsResult);
		var eduDetailsObjSSC = {
			eduType: "school",
			boardOrCourseName: req.body.ssc_board_name || "",
			university: "",
			passingYear: parseInt(req.body.ssc_passing_year) || 0,
			percentage: parseFloat(req.body.ssc_percentage) || 0,
			name: "ssc"
		}
		var eduDetailsObjHSC = {
			eduType: "school",
			boardOrCourseName: req.body.hsc_board_name || "",
			university: "",
			passingYear: parseInt(req.body.hsc_passing_year) || 0,
			percentage: parseFloat(req.body.hsc_percentage) || 0,
			name: "hsc"

		}
		var eduDetailsObjBachelor = {
			eduType: "university",
			boardOrCourseName: req.body.bachelor_course_name || "",
			university: req.body.bachelor_university || "",
			passingYear: parseInt(req.body.bachelor_passing_year) || 0,
			percentage: parseFloat(req.body.bachelor_percentage) || 0,
			name: "bachelor"

		}
		var eduDetailsObjMaster = {
			eduType: "university",
			boardOrCourseName: req.body.master_course_name || "",
			university: req.body.master_university || "",
			passingYear: parseInt(req.body.master_passing_year) || 0,
			percentage: parseFloat(req.body.master_percentage) || 0,
			name: "master"
		}


		var updateEducationDetailsSSC = await updateEducationDetails(Object.values(eduDetailsObjSSC), queryId, eduDetailsObjSSC.name);
		var updateEducationDetailsHSC = await updateEducationDetails(Object.values(eduDetailsObjHSC), queryId, eduDetailsObjHSC.name);
		var updateEducationDetailsBachelor = await updateEducationDetails(Object.values(eduDetailsObjBachelor), queryId, eduDetailsObjBachelor.name);
		if (req.body.master_course_name && req.body.master_university && req.body.master_passing_year && req.body.master_percentage) {
			var updateEducationDetailsMaster = await updateEducationDetails(Object.values(eduDetailsObjMaster), queryId, eduDetailsObjMaster.name);
		}

		var workExpCompanyNames = req.body.company_name;
		var workExpCompanyDesignations = req.body.designation_company;
		var workExpCompanyFromDate = req.body.from_date_company;
		var workExpCompanyToDate = req.body.to_date_company;
		var workExpId = req.body.workId;


		var updateWorkExpResult = [];
		for (let i = 0; i < workExpCompanyNames.length; i++) {
			var temp = {
				companyName: workExpCompanyNames[i],
				designation: workExpCompanyDesignations[i],
				fromDate: new Date(workExpCompanyFromDate[i]),
				toDate: new Date(workExpCompanyToDate[i])
			}
			// console.log(temp);
			updateWorkExpResult[i] = await updateWorkExpDetails(Object.values(temp), queryId, workExpId[i]);
		}


		var languages = [req.body.language_1 || [], req.body.language_2 || [], req.body.language_3 || []];
		// console.log("--",languages);

		// var guj = languages.filter((ele)=>ele.includes("gujarati"));
		var updateLanguageKnownResult = [];
		for (let j = 0; j < languages.length; j++) {
			var langNameInput;
			if (j == 0) langNameInput = "hindi";
			if (j == 1) langNameInput = "english";
			if (j == 2) langNameInput = "gujarati";
			for (let i = 1; i < 4; i++) {
				let langLevelInput = "";
				if (i == 1) langLevelInput = "read";
				if (i == 2) langLevelInput = "write";
				if (i == 3) langLevelInput = "speak";
				var temp = {
					langId: "",
					langName: languages[j][0],
					langLevelId: "",
					langLevel: languages[j][i] || "",
					langNameInput: langNameInput,
					langLevelInput: langLevelInput
				}
				updateLanguageKnownResult[i] = await updateLanguageDetails(Object.values(temp), queryId);
			}
		}

		var tech = [req.body.tech_1 || [], req.body.tech_2 || [], req.body.tech_3 || [], req.body.tech_4 || []];
		var updateTechResult = [];
		// console.log(tech);
		for (let j = 0; j < tech.length; j++) {
			var technologyNameInput;
			if (j == 0) technologyNameInput = "php";
			if (j == 1) technologyNameInput = "mysql";
			if (j == 2) technologyNameInput = "laravel";
			if (j == 3) technologyNameInput = "oracle";

			var t = {
				technologyName: tech[j][0],
				technologyLevel: tech[j][1],
				technologyNameInput: technologyNameInput,
			}
			if (t.technologyLevel === "") {
				t.technologyName = technologyNameInput;
			}
			updateTechResult[j] = await updateTechDetails(Object.values(t), queryId);
		}

		var refNames = req.body.reference_name;
		var refContacts = req.body.reference_contact;
		var refRelations = req.body.reference_relation;
		var refIds = req.body.refId;


		var updateRefResult = [];
		for (let i = 0; i < refNames.length; i++) {
			var t = {
				name: refNames[i],
				contactNumber: refContacts[i],
				relation: refRelations[i]
			}
			updateRefResult[i] = await updateReferenceDetails(Object.values(t), queryId, refIds[i]);
		}
		var updatePreferencesResult = [];

		var prefIds = req.body.prefId;

		var preferedLocations = req.body.prefered_location;
		for (let i = 0; i < preferedLocations.length; i++) {
			var temp = {
				preferedLocation: preferedLocations[i],
				preferenceOrder: i + 1,
				noticePeriod: parseFloat(req.body.notice_period),
				expectedCTC: parseFloat(req.body.expected_ctc),
				currentCTC: parseFloat(req.body.current_ctc),
				department: req.body.department + ""
			}
			// console.log(temp);

			updatePreferencesResult[i] = await updatePreferenceDetails(Object.values(temp), queryId, prefIds[i]);
		}


		res.redirect("/job-application-form")
	} catch (error) {
		console.log(error);
	}
}

module.exports = updateForm;