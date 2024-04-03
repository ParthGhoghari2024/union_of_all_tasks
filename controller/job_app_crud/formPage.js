const fs = require("fs");
const getSelectMetaData = require("../../helper/job_app_crud/getSelectMetaData");
const { insertBasicDetails, selectBasicDetails } = require("../../helper/job_app_crud/dbHelperBasicDetails");
const { insertEducationDetails, selectEducationDetails, reducedSelectEducationDetails } = require("../../helper/job_app_crud/dbHelperEducationDetails");
const { insertWorkExpDetails, selectWorkExpDetails, reducedSelectWorkExpDetails } = require("../../helper/job_app_crud/dbHelperWorkExpDetails");
const { insertLanguageDetails, selectLanguageDetails, reducedSelectLanguage } = require("../../helper/job_app_crud/dbHelperLanguageDetails");
const { insertTechDetails, selectTechDetails, reducedSelectTechDetails } = require("../../helper/job_app_crud/dbHelperTechDetails");
const { insertReferenceDetails, selectReferenceDetails, reducedSelectReferenceDetails } = require("../../helper/job_app_crud/dbHelperReferenceDetails");
const { insertPreferenceDetails, selectPreferenceDetails, reducedSelectPreferenceDetails } = require("../../helper/job_app_crud/dbHelperPreferenceDetails");

async function formPage(req, res) {
	try {
		if (req.method == "POST") {
			// console.log(req.body);
			let basicDetailsObj = {
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
			let insertBasicDetailsResult = await insertBasicDetails(Object.values(basicDetailsObj));

			// console.log(1, insertBasicDetailsResult);
			let eduDetailsObjSSC = {
				bDMId: insertBasicDetailsResult.insertId,
				eduType: "school",
				boardOrCourseName: req.body.ssc_board_name || "",
				university: "",
				passingYear: parseInt(req.body.ssc_passing_year) || 0,
				percentage: parseFloat(req.body.ssc_percentage) || 0,
				name: "ssc"
			}
			let eduDetailsObjHSC = {
				bDMId: insertBasicDetailsResult.insertId,
				eduType: "school",
				boardOrCourseName: req.body.hsc_board_name || "",
				university: "",
				passingYear: parseInt(req.body.hsc_passing_year) || 0,
				percentage: parseFloat(req.body.hsc_percentage) || 0,
				name: "hsc"

			}
			let eduDetailsObjBachelor = {
				bDMId: insertBasicDetailsResult.insertId,
				eduType: "university",
				boardOrCourseName: req.body.bachelor_course_name || "",
				university: req.body.bachelor_university || "",
				passingYear: parseInt(req.body.bachelor_passing_year) || 0,
				percentage: parseFloat(req.body.bachelor_percentage) || 0,
				name: "bachelor"

			}
			let eduDetailsObjMaster = {
				bDMId: insertBasicDetailsResult.insertId,
				eduType: "university",
				boardOrCourseName: req.body.master_course_name || "",
				university: req.body.master_university || "",
				passingYear: parseInt(req.body.master_passing_year) || 0,
				percentage: parseFloat(req.body.master_percentage) || 0,
				name: "master"
			}


			let insertEducationDetailsSSC = await insertEducationDetails(Object.values(eduDetailsObjSSC));
			let insertEducationDetailsHSC = await insertEducationDetails(Object.values(eduDetailsObjHSC));
			let insertEducationDetailsBachelor = await insertEducationDetails(Object.values(eduDetailsObjBachelor));
			if (req.body.master_course_name && req.body.master_university && req.body.master_passing_year && req.body.master_percentage) {
				let insertEducationDetailsMaster = await insertEducationDetails(Object.values(eduDetailsObjMaster));
			}


			let workExpCompanyNames = req.body.company_name;
			let workExpCompanyDesignations = req.body.designation_company;
			let workExpCompanyFromDate = req.body.from_date_company;
			let workExpCompanyToDate = req.body.to_date_company;


			let insertWorkExpResult = [];
			for (let i = 0; i < workExpCompanyNames.length; i++) {
				let temp = {
					bDMId: insertBasicDetailsResult.insertId,
					companyName: workExpCompanyNames[i],
					designation: workExpCompanyDesignations[i],
					fromDate: new Date(workExpCompanyFromDate[i]),
					toDate: new Date(workExpCompanyToDate[i])
				}
				if (temp.companyName != "" && temp.designation != "" && !isNaN(new Date(workExpCompanyFromDate[i]).getDate()) && !isNaN(new Date(workExpCompanyToDate[i]).getDate())) {
					insertWorkExpResult[i] = await insertWorkExpDetails(Object.values(temp));
				}
			}



			// console.log(insertWorkExpResult);

			let languages = [req.body.language_1 || [], req.body.language_2 || [], req.body.language_3 || []];
			// console.log(languages);
			let insertLanguageKnownResult = [];
			for (let j = 0; j < languages.length; j++) {
				for (let i = 1; i < languages[j].length; i++) {
					let temp = {
						bDMId: insertBasicDetailsResult.insertId,
						langId: "",
						langName: languages[j][0],
						langLevelId: "",
						langLevel: languages[j][i]
					}
					if (temp.langName != "" && temp.langLevel != "") {
						insertLanguageKnownResult[i] = await insertLanguageDetails(Object.values(temp));
					}
				}
			}

			let tech = [req.body.tech_1 || [], req.body.tech_2 || [], req.body.tech_3 || [], req.body.tech_4 || []];
			let insertTechResult = [];
			for (let j = 0; j < tech.length; j++) {
				if (tech[j].length === 2) {
					for (let i = 1; i < tech[j].length; i++) {
						if (tech[j][0] === "php" || tech[j][0] === "mysql" || tech[j][0] === "laravel" || tech[j][0] === "oracle" || tech[j][1] === "beginer" || tech[j][1] === "mideator" || tech[j][1] === "expert") {
							let temp = {
								bDMId: insertBasicDetailsResult.insertId,
								technologyName: tech[j][0],
								technologyLevel: tech[j][1]
							}
							if (temp.technologyName != "" && temp.technologyLevel != "") {
								insertTechResult[i] = await insertTechDetails(Object.values(temp));
							}
						}
					}
				}
			}

			let refNames = req.body.reference_name;
			let refContacts = req.body.reference_contact;
			let refRelations = req.body.reference_relation;


			let insertRefResult = [];
			for (let i = 0; i < refNames.length; i++) {
				let t = {
					bDMId: insertBasicDetailsResult.insertId,
					name: refNames[i],
					contactNumber: refContacts[i],
					relation: refRelations[i]
				}
				if (t.name != "" && t.contactNumber != "" && t.relation != "") {
					insertRefResult[i] = await insertReferenceDetails(Object.values(t));
				}
			}


			let preferencesResult = [];

			let preferedLocations = req.body.prefered_location;
			for (let i = 0; i < preferedLocations.length; i++) {
				let temp = {
					bDMId: insertBasicDetailsResult.insertId,
					preferedLocation: preferedLocations[i],
					preferenceOrder: i + 1,
					noticePeriod: parseFloat(req.body.notice_period),
					expectedCTC: parseFloat(req.body.expected_ctc),
					currentCTC: parseFloat(req.body.current_ctc),
					department: req.body.department + ""
				}

				preferencesResult[i] = await insertPreferenceDetails(Object.values(temp));
			}


			//note: if post data is posted succesfully then response will be redirected to form page
		}

		//now this onwards is for get method and if posted successfully the same for post request
		const selectGender = await getSelectMetaData("gender");
		const selectRelationshipStatus = await getSelectMetaData("relationship_status");




		// console.log(req.query.id);


		let reqBody = {
			firstname: '',
			lastname: '',
			designation: '',
			address1: '',
			email: '',
			address2: '',
			phone: '',
			city: '',
			gender: '',
			state: '',
			relationship_status: '',
			dob: '',
			ssc_board_name: '',
			ssc_passing_year: '',
			ssc_percentage: '',
			hsc_board_name: '',
			hsc_passing_year: '',
			hsc_percentage: '',
			bachelor_course_name: '',
			bachelor_university: '',
			bachelor_passing_year: '',
			bachelor_percentage: '',
			master_course_name: '',
			master_university: '',
			master_passing_year: '',
			master_percentage: '',
			workId: ['', '', ''],
			company_name: ['', '', ''],
			designation_company: ['', '', ''],
			from_date_company: ['', '', ''],
			to_date_company: ['', '', ''],
			language_1: ['', '', ''],
			language_2: ['', '', ''],
			language_3: ['', '', ''],
			tech_1: ['', ''],
			tech_2: ['', ''],
			tech_3: ['', ''],
			tech_4: ['', ''],
			refId: ['', ''],
			reference_1_name: '',
			reference_1_contact: '',
			reference_1_relation: '',
			reference_2_name: '',
			reference_2_contact: '',
			reference_2_relation: '',
			reference_name: ['', ''],
			reference_contact: ['', ''],
			reference_relation: ['', ''],
			prefId: ['', '', ''],
			prefered_location: ['', '', ''],
			notice_period: '',
			expected_ctc: '',
			current_ctc: '',
			department: ''
		}

		let queryId = req.query.id;
		if (queryId) {
			let basicDetails = await selectBasicDetails(queryId);
			basicDetails = basicDetails[0];

			let eduDetails = await reducedSelectEducationDetails(queryId);
			// console.log(eduDetails);
			// console.log(basicDetails);
			let sscIndex = eduDetails.name.indexOf("ssc");
			let hscIndex = eduDetails.name.indexOf("hsc");
			let bachelorIndex = eduDetails.name.indexOf("bachelor");
			let masterIndex = eduDetails.name.indexOf("master");


			let workExpDetails = await reducedSelectWorkExpDetails(queryId);


			// console.log("{",workExpDetails);

			let languageDetails = await reducedSelectLanguage(queryId);
			// console.log(languageDetails);
			let techDetails = await reducedSelectTechDetails(queryId);
			// console.log(techDetails);

			let referenceDetails = await reducedSelectReferenceDetails(queryId);
			// console.log(referenceDetails);
			let preferenceDetails = await reducedSelectPreferenceDetails(queryId);
			// console.log(preferenceDetails);
			// console.log(preferenceDetails);



			let l1_index = languageDetails.langName.indexOf("hindi");
			let l1_arr = languageDetails.langName.filter((obj) => obj === "hindi")
			let l2_index = languageDetails.langName.indexOf("english");
			let l2_arr = languageDetails.langName.filter((obj) => obj === "english")
			let l3_index = languageDetails.langName.indexOf("gujarati");
			let l3_arr = languageDetails.langName.filter((obj) => obj === "gujarati")


			let t1_index = techDetails.technologyName.indexOf("php");
			let t2_index = techDetails.technologyName.indexOf("mysql");
			let t3_index = techDetails.technologyName.indexOf("laravel");
			let t4_index = techDetails.technologyName.indexOf("oracle");

			reqBody = {
				firstname: basicDetails.firstName || '',
				lastname: basicDetails.lastName || '',
				designation: basicDetails.designation || '',
				address1: basicDetails.address1 || '',
				email: basicDetails.email || '',
				address2: basicDetails.address2 || '',
				phone: basicDetails.phoneNumber || '',
				city: basicDetails.city || '',
				gender: basicDetails.gender || '',
				state: basicDetails.state || '',
				relationship_status: basicDetails.relationshipStatus || '',
				dob: new Date(basicDetails.dob).toLocaleDateString() || '',
				ssc_board_name: eduDetails.boardOrCourseName[sscIndex] || '',
				ssc_passing_year: eduDetails.passingYear[sscIndex] || '',
				ssc_percentage: eduDetails.percentage[sscIndex] || '',
				hsc_board_name: eduDetails.boardOrCourseName[hscIndex] || '',
				hsc_passing_year: eduDetails.passingYear[hscIndex] || '',
				hsc_percentage: eduDetails.percentage[hscIndex] || '',
				bachelor_course_name: eduDetails.boardOrCourseName[bachelorIndex] || '',
				bachelor_university: eduDetails.university[bachelorIndex] || '',
				bachelor_passing_year: eduDetails.passingYear[bachelorIndex] || '',
				bachelor_percentage: eduDetails.percentage[bachelorIndex] || '',
				master_course_name: eduDetails.boardOrCourseName[masterIndex] || '',
				master_university: eduDetails.university[masterIndex] || '',
				master_passing_year: eduDetails.passingYear[masterIndex] || '',
				master_percentage: eduDetails.percentage[masterIndex] || '',
				workId: (workExpDetails) ? (workExpDetails.wEMId || ['', '', '']) : [],
				company_name: (workExpDetails) ? (workExpDetails.companyName || ['', '', '']) : [],
				designation_company: (workExpDetails) ? (workExpDetails.designation || ['', '', '']) : [],
				from_date_company: (workExpDetails) ? (workExpDetails.fromDate || ['', '', '']) : [],
				to_date_company: (workExpDetails) ? (workExpDetails.toDate || ['', '', '']) : [],
				language_1: [languageDetails.langName[l1_index] || '', languageDetails.langLevel.slice(l1_index, l1_index + l1_arr.length)].flat() || ['', '', ''] || ['', '', '', ''],
				language_2: [languageDetails.langName[l2_index] || '', languageDetails.langLevel.slice(l2_index, l2_index + l2_arr.length)].flat() || ['', '', ''] || ['', '', '', ''],
				language_3: [languageDetails.langName[l3_index] || '', languageDetails.langLevel.slice(l3_index, l3_index + l3_arr.length)].flat() || ['', '', ''] || ['', '', '', ''],
				tech_1: [techDetails.technologyName[t1_index] || '', techDetails.technologyLevel[t1_index] || ''] || ['', ''],
				tech_2: [techDetails.technologyName[t2_index] || '', techDetails.technologyLevel[t2_index] || ''] || ['', ''],
				tech_3: [techDetails.technologyName[t3_index] || '', techDetails.technologyLevel[t3_index] || ''] || ['', ''],
				tech_4: [techDetails.technologyName[t4_index] || '', techDetails.technologyLevel[t4_index] || ''] || ['', ''],
				refId: (referenceDetails) ? (referenceDetails.rCId || ['', '']) : [],
				reference_name: (referenceDetails) ? (referenceDetails.name || ['', '']) : [],
				reference_contact: (referenceDetails) ? (referenceDetails.contactNumber || ['', '']) : [],
				reference_relation: (referenceDetails) ? (referenceDetails.relation || ['', '']) : [],
				prefId: preferenceDetails.prefId || ['', '', ''],
				prefered_location: preferenceDetails.preferedLocation || ['', '', ''],
				notice_period: preferenceDetails.noticePeriod || '',
				expected_ctc: preferenceDetails.expectedCTC || '',
				current_ctc: preferenceDetails.currentCTC || '',
				department: preferenceDetails.department || ''
			}

		}

		// console.log(reqBody);

		res.render("job_app_crud/form",
			{
				error: "",
				reqBody: reqBody,
				id: req.query.id,
				selectGender: {
					data: selectGender,
					selected: reqBody.gender === "f" ? "female" : "male"
				},
				selectRelationshipStatus: {
					data: selectRelationshipStatus,
					selected: reqBody.relationship_status === "m" ? "married" : "single"
				},
			}

		);
	} catch (error) {
		console.log(error);
	}
}

module.exports = formPage;