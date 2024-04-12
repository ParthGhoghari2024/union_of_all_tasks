const getSelectMetaData = require("../../helper/job_app_crud/getSelectMetaData");
let selectGender;
let selectRelationshipStatus;
async function jobAppValidate(req, res, next) {
	try {
		let reqBody = req.body;
		selectGender = await getSelectMetaData("gender");
		selectRelationshipStatus = await getSelectMetaData("relationship_status");



		if (!req.body.department) {
			reqBody.department = [''];
		}
		if (!req.body.language_1) {
			reqBody.language_1 = ['', '', ''];
		}
		if (!req.body.language_2) {
			reqBody.language_2 = ['', '', ''];
		}
		if (!req.body.language_3) {
			reqBody.language_3 = ['', '', ''];
		}
		if (typeof (req.body.language_1) === "string") {
			reqBody.language_1 = [req.body.language_1, '', ''];
		}
		if (typeof (req.body.language_2) === "string") {
			reqBody.language_2 = [req.body.language_2, '', ''];
		}
		if (typeof (req.body.language_3) === "string") {
			reqBody.language_3 = [req.body.language_3, '', ''];
		}

		if (!req.body.department) {
			reqBody.department = [''];
		}

		if (!req.body.tech_1) {
			reqBody.tech_1 = ['', '', ''];
		}
		if (!req.body.tech_2) {
			reqBody.tech_2 = ['', '', ''];
		}
		if (!req.body.tech_3) {
			reqBody.tech_3 = ['', '', ''];
		}
		if (!req.body.tech_4) {
			reqBody.tech_4 = ['', '', ''];
		}
		if (typeof (req.body.tech_1) === "string") {
			reqBody.tech_1 = [req.body.tech_1, ''];
		}
		if (typeof (req.body.tech_2) === "string") {
			reqBody.tech_2 = [req.body.tech_2, ''];
		}
		if (typeof (req.body.tech_3) === "string") {
			reqBody.tech_3 = [req.body.tech_3, ''];
		}
		if (typeof (req.body.tech_4) === "string") {
			reqBody.tech_4 = [req.body.tech_4, ''];
		}
		// console.log(reqBody);

		let validateBasicDeatilsResult = validateBasicDeatils(reqBody, req, res);
		if (validateBasicDeatilsResult) return;
		let validateEduDetailsResult = validateEduDetails(reqBody, req, res);
		if (validateEduDetailsResult) return;
		let validateWorkExDetailsResult = validateWorkExDetails(reqBody, req, res);
		if (validateWorkExDetailsResult) return;
		let validateLanguageDetailsResult = validateLanguageDetails(reqBody, req, res);
		if (validateLanguageDetailsResult) return;
		let validateTechDetailsResult = validateTechDetails(reqBody, req, res);
		if (validateTechDetailsResult) return;
		let validateRefDetailsResult = validateRefDetails(reqBody, req, res);
		if (validateRefDetailsResult) return;
		let validatePreferencesDetailsResult = validatePreferencesDetails(reqBody, req, res);
		if (validatePreferencesDetailsResult) return;

		next();
	} catch (error) {
		console.log(error);
	}
}
function checkIfNumber(text) {
	return !isNaN(parseInt(text));
}
function checkLength(text, length) {
	return text.length === length;
}
function validateBasicDeatils(reqBody, req, res) {
	if (!reqBody.firstname ||
		!reqBody.lastname ||
		!reqBody.designation ||
		!reqBody.address1 ||
		!reqBody.email ||
		!reqBody.phone ||
		!reqBody.city ||
		!reqBody.state ||
		!reqBody.relationship_status ||
		!reqBody.dob) {
		res.render("job_app_crud/form", {
			error: "Enter basic details properly", reqBody: reqBody, selectGender: {
				data: selectGender,
				selected: reqBody.gender === "f" ? "female" : "male"
			},
			selectRelationshipStatus: {
				data: selectRelationshipStatus,
				selected: reqBody.relationship_status === "m" ? "married" : "single"
			}
		})
		return 1;
	}
	let emailRegEx = /\S+@\S+\.\S+/;
	if (!emailRegEx.test(reqBody.email)) {
		res.render("job_app_crud/form", {
			error: "Enter Email properly", reqBody: reqBody, selectGender: {
				data: selectGender,
				selected: reqBody.gender === "f" ? "female" : "male"
			},
			selectRelationshipStatus: {
				data: selectRelationshipStatus,
				selected: reqBody.relationship_status === "m" ? "married" : "single"
			}
		})
		return 1;
	}
	if (!checkIfNumber(reqBody.phone) || !checkLength(reqBody.phone, 10)) {
		res.render("job_app_crud/form", {
			error: "Enter phone number properly", reqBody: reqBody, selectGender: {
				data: selectGender,
				selected: reqBody.gender === "f" ? "female" : "male"
			},
			selectRelationshipStatus: {
				data: selectRelationshipStatus,
				selected: reqBody.relationship_status === "m" ? "married" : "single"
			}
		})
		return 1;
	}

	return 0;
}

function validateEduDetails(reqBody, req, res) {
	if (
		!reqBody.ssc_board_name ||
		!reqBody.ssc_passing_year ||
		!reqBody.ssc_percentage || !checkIfNumber(reqBody.ssc_passing_year) || !checkIfNumber(reqBody.ssc_percentage) ||
		!reqBody.hsc_board_name ||
		!reqBody.hsc_passing_year ||
		!reqBody.hsc_percentage || !checkIfNumber(reqBody.hsc_passing_year) || !checkIfNumber(reqBody.hsc_percentage) ||
		!reqBody.bachelor_course_name ||
		!reqBody.bachelor_university ||
		!reqBody.bachelor_passing_year ||
		!reqBody.bachelor_percentage || !checkIfNumber(reqBody.bachelor_passing_year) || !checkIfNumber(reqBody.bachelor_percentage) ||
		((reqBody.master_course_name ||
			reqBody.master_university ||
			reqBody.master_passing_year ||
			reqBody.master_percentage) && (!reqBody.master_course_name || !reqBody.master_university || !reqBody.master_passing_year || !reqBody.master_percentage || !checkIfNumber(reqBody.master_percentage) || !checkIfNumber(reqBody.master_passing_year)))//FOR MASTER IF ONE VALUE IS THERE THEN ALL FOUR VALUES ARE NEEDED
	) {
		res.render("job_app_crud/form", {
			error: "Enter Education details properly", reqBody: reqBody, selectGender: {
				data: selectGender,
				selected: reqBody.gender === "f" ? "female" : "male"
			},
			selectRelationshipStatus: {
				data: selectRelationshipStatus,
				selected: reqBody.relationship_status === "m" ? "married" : "single"
			}
		})
		return 1;
	}

	return 0;
}
function validateWorkExDetails(reqBody, req, res) {
	let workExpCompanyNames = req.body.company_name;
	let workExpCompanyDesignations = req.body.designation_company;
	let workExpCompanyFromDate = req.body.from_date_company;
	let workExpCompanyToDate = req.body.to_date_company;



	for (let i = 0; i < workExpCompanyNames.length; i++) {
		let temp = {
			companyName: workExpCompanyNames[i] === "" ? null : workExpCompanyNames[i],
			designation: workExpCompanyDesignations[i] === "" ? null : workExpCompanyDesignations[i],
			fromDate: new Date(workExpCompanyFromDate[i]),
			toDate: new Date(workExpCompanyToDate[i])
		}
		isNaN(new Date(workExpCompanyFromDate[i]).getDate()) ? temp.fromDate = null : "";
		isNaN(new Date(workExpCompanyToDate[i]).getDate()) ? temp.toDate = null : "";
		if ((temp.companyName || temp.designation || temp.fromDate || temp.toDate) && (!temp.companyName || !temp.designation || !temp.toDate || !temp.fromDate)) {
			res.render("job_app_crud/form", {
				error: "Enter work experience details properly", reqBody: reqBody, selectGender: {
					data: selectGender,
					selected: reqBody.gender === "f" ? "female" : "male"
				},
				selectRelationshipStatus: {
					data: selectRelationshipStatus,
					selected: reqBody.relationship_status === "m" ? "married" : "single"
				}
			})
			return 1;
		}
	}

	return 0;
}

function validateLanguageDetails(reqBody, req, res) {
	let temp = JSON.parse(JSON.stringify(reqBody));//to copy object without reference
	// if(reqBody.language_1[0]==="" && reqBody.language_1[1]==="" && reqBody.language_1[2]===""){
	//     temp.language_1=null;
	// }
	// if(reqBody.language_2[0]==="" && reqBody.language_2[1]==="" && reqBody.language_2[2]===""){
	//     temp.language_2=null;
	// }
	// if(reqBody.language_3[0]==="" && reqBody.language_3[1]==="" && reqBody.language_3[2]===""){
	//     temp.language_3=null;
	// }
	// if ((temp.language_1 && temp.language_1[0] === "") || (temp.language_2 && temp.language_2[0] === "") || (temp.language_3 && temp.language_3[0] === "")) {
	//     res.render("form", { error: "select language properly", reqBody: reqBody })
	//     return 1;
	// }
	let checkForLanguage_1 = temp.language_1.filter((obj) => obj != "").length === 1;
	let checkForLanguage_2 = temp.language_2.filter((obj) => obj != "").length === 1;
	let checkForLanguage_3 = temp.language_3.filter((obj) => obj != "").length === 1;

	if (checkForLanguage_1 || checkForLanguage_2 || checkForLanguage_3) {
		res.render("job_app_crud/form", {
			error: "select language properly", reqBody: reqBody, selectGender: {
				data: selectGender,
				selected: reqBody.gender === "f" ? "female" : "male"
			},
			selectRelationshipStatus: {
				data: selectRelationshipStatus,
				selected: reqBody.relationship_status === "m" ? "married" : "single"
			}
		})
		return 1;
	}

	return 0;
}

function validateTechDetails(reqBody, req, res) {
	let temp = JSON.parse(JSON.stringify(reqBody));//to copy object without reference
	if (reqBody.tech_1[0] === "" && reqBody.tech_1[1] === "" && reqBody.tech_1[2] === "") {
		temp.tech_1 = null;
	}
	if (reqBody.tech_2[0] === "" && reqBody.tech_2[1] === "" && reqBody.tech_2[2] === "") {
		temp.tech_2 = null;
	}
	if (reqBody.tech_3[0] === "" && reqBody.tech_3[1] === "" && reqBody.tech_3[2] === "") {
		temp.tech_3 = null;
	}
	if ((temp.tech_1 && temp.tech_1[0] === "") || (temp.tech_2 && temp.tech_2[0] === "") || (temp.tech_3 && temp.tech_3[0] === "")) {
		res.render("job_app_crud/form", {
			error: "select technology properly", reqBody: reqBody, selectGender: {
				data: selectGender,
				selected: reqBody.gender === "f" ? "female" : "male"
			},
			selectRelationshipStatus: {
				data: selectRelationshipStatus,
				selected: reqBody.relationship_status === "m" ? "married" : "single"
			}
		})
		return 1;
	}
	return 0;
}
function validateRefDetails(reqBody, req, res) {
	let refNames = req.body.reference_name;
	let refContacts = req.body.reference_contact;
	let refRelations = req.body.reference_relation;


	for (let i = 0; i < refNames.length; i++) {
		let t = {
			name: refNames[i],
			contactNumber: refContacts[i],
			relation: refRelations[i]
		}
		if ((t.name || t.contactNumber || t.relation) && (!t.name || !t.contactNumber || !t.relation)) {
			res.render("job_app_crud/form", {
				error: "Enter references details properly", reqBody: reqBody, selectGender: {
					data: selectGender,
					selected: reqBody.gender === "f" ? "female" : "male"
				},
				selectRelationshipStatus: {
					data: selectRelationshipStatus,
					selected: reqBody.relationship_status === "m" ? "married" : "single"
				}
			})
			return 1;
		}
	}
}

function validatePreferencesDetails(reqBody, req, res) {
	for (let i = 0; i < reqBody.prefered_location.length; i++) {
		if (!reqBody.prefered_location[i] || reqBody.prefered_location[i] === "") {
			res.render("job_app_crud/form", {
				error: "Enter prefered details properly", reqBody: reqBody, selectGender: {
					data: selectGender,
					selected: reqBody.gender === "f" ? "female" : "male"
				},
				selectRelationshipStatus: {
					data: selectRelationshipStatus,
					selected: reqBody.relationship_status === "m" ? "married" : "single"
				}
			})
			return 1;
		}
	};
	if (!reqBody.notice_period || !reqBody.expected_ctc || !reqBody.current_ctc || !reqBody.department || isNaN(parseFloat(reqBody.notice_period)) || isNaN(parseFloat(reqBody.expected_ctc)) || isNaN(parseFloat(reqBody.current_ctc))) {
		res.render("job_app_crud/form", {
			error: "Enter Preferences  details properly", reqBody: reqBody, selectGender: {
				data: selectGender,
				selected: reqBody.gender === "f" ? "female" : "male"
			},
			selectRelationshipStatus: {
				data: selectRelationshipStatus,
				selected: reqBody.relationship_status === "m" ? "married" : "single"
			}
		})
		return 1;
	}

	return 0;
}


module.exports = { jobAppValidate };
