const getSelectMetaData = require("../../helper/job_app_crud/getSelectMetaData");
var selectGender;
var selectRelationshipStatus;
async function jobAppValidate(req, res, next) {

    var reqBody = req.body;

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

    var validateBasicDeatilsResult = validateBasicDeatils(reqBody, req, res);
    if (validateBasicDeatilsResult) return;
    var validateEduDetailsResult = validateEduDetails(reqBody, req, res);
    if (validateEduDetailsResult) return;
    var validateWorkExDetailsResult = validateWorkExDetails(reqBody, req, res);
    if (validateWorkExDetailsResult) return;
    var validateLanguageDetailsResult = validateLanguageDetails(reqBody, req, res);
    if (validateLanguageDetailsResult) return;
    var validateTechDetailsResult = validateTechDetails(reqBody, req, res);
    if (validateTechDetailsResult) return;
    var validateRefDetailsResult = validateRefDetails(reqBody, req, res);
    if (validateRefDetailsResult) return;
    var validatePreferencesDetailsResult = validatePreferencesDetails(reqBody, req, res);
    if (validatePreferencesDetailsResult) return;

    next();
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
        return res.json({
            error: "Enter basic details properly"
        })
    }
    var emailRegEx = /\S+@\S+\.\S+/;
    if (!emailRegEx.test(reqBody.email)) {
        return res.json({
            error: "Enter Email properly"
        })
    }
    if (!checkIfNumber(reqBody.phone) || !checkLength(reqBody.phone, 10)) {
        return res.json( {
            error: "Enter phone number properly"
        })
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
        return res.json({
            error: "Enter Education details properly"
        })
    }

    return 0;
}
function validateWorkExDetails(reqBody, req, res) {
    var workExpCompanyNames = req.body.company_name;
    var workExpCompanyDesignations = req.body.designation_company;
    var workExpCompanyFromDate = req.body.from_date_company;
    var workExpCompanyToDate = req.body.to_date_company;



    for (let i = 0; i < workExpCompanyNames.length; i++) {
        var temp = {
            companyName: workExpCompanyNames[i] === "" ? null : workExpCompanyNames[i],
            designation: workExpCompanyDesignations[i] === "" ? null : workExpCompanyDesignations[i],
            fromDate: new Date(workExpCompanyFromDate[i]),
            toDate: new Date(workExpCompanyToDate[i])
        }
        isNaN(new Date(workExpCompanyFromDate[i]).getDate()) ? temp.fromDate = null : "";
        isNaN(new Date(workExpCompanyToDate[i]).getDate()) ? temp.toDate = null : "";
        if ((temp.companyName || temp.designation || temp.fromDate || temp.toDate) && (!temp.companyName || !temp.designation || !temp.toDate || !temp.fromDate)) {
            return res.json( {
                error: "Enter work experience details properly"
            })
        }
    }

    return 0;
}

function validateLanguageDetails(reqBody, req, res) {
    var temp = JSON.parse(JSON.stringify(reqBody));//to copy object without reference
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
    var checkForLanguage_1 = temp.language_1.filter((obj) => obj != "").length === 1;
    var checkForLanguage_2 = temp.language_2.filter((obj) => obj != "").length === 1;
    var checkForLanguage_3 = temp.language_3.filter((obj) => obj != "").length === 1;

    if (checkForLanguage_1 || checkForLanguage_2 || checkForLanguage_3) {
        return res.json({
            error: "select language properly"
        })
    }

    return 0;
}

function validateTechDetails(reqBody, req, res) {
    var temp = JSON.parse(JSON.stringify(reqBody));//to copy object without reference
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
        return res.json({
            error: "select technology properly"
        })
    }
    return 0;
}
function validateRefDetails(reqBody, req, res) {
    var refNames = req.body.reference_name;
    var refContacts = req.body.reference_contact;
    var refRelations = req.body.reference_relation;


    for (let i = 0; i < refNames.length; i++) {
        var t = {
            name: refNames[i],
            contactNumber: refContacts[i],
            relation: refRelations[i]
        }
        if ((t.name || t.contactNumber || t.relation) && (!t.name || !t.contactNumber || !t.relation)) {
            return res.json( {
                error: "Enter references details properly"
            })
        }
    }
}

function validatePreferencesDetails(reqBody, req, res) {
    for (let i = 0; i < reqBody.prefered_location.length; i++) {
        if (!reqBody.prefered_location[i] || reqBody.prefered_location[i] === "") {
            return res.json({
                error: "Enter prefered details properly"
            })
        }
    };
    if (!reqBody.notice_period || !reqBody.expected_ctc || !reqBody.current_ctc || !reqBody.department || isNaN(parseFloat(reqBody.notice_period)) || isNaN(parseFloat(reqBody.expected_ctc)) || isNaN(parseFloat(reqBody.current_ctc))) {
        return res.json({
            error: "Enter Preferences  details properly"
        })
    }

    return 0;
}


module.exports = { jobAppValidate };