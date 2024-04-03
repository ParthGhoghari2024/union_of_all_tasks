const { dataExistBybDMId } = require("../../../helper/multistep_jobapp/dataExist");
const { insertBasicDetails, updateBasicDetails } = require("../../../helper/multistep_jobapp/dbHelperBasicDetails");
const { insertEducationDetails } = require("../../../helper/multistep_jobapp/dbHelperEducationDetails");
const { insertLanguageDetails } = require("../../../helper/multistep_jobapp/dbHelperLanguageDetails");
const { insertPreferenceDetails } = require("../../../helper/multistep_jobapp/dbHelperPreferenceDetails");
const { insertReferenceDetails } = require("../../../helper/multistep_jobapp/dbHelperReferenceDetails");
const { insertTechDetails } = require("../../../helper/multistep_jobapp/dbHelperTechDetails");
const { insertWorkExpDetails } = require("../../../helper/multistep_jobapp/dbHelperWorkExpDetails");
const { updateBasicDetailsRoute, updateEduDetailsRoute, updateWorkExpDetailsRoute, updateLanguageDetailsRoute, updateTechDetailsRoute, updatePreferenceDetailsRoute, updateReferenceDetailsRoute } = require("./updateOnAtATime");

async function insertForm(req, res) {
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
        var insertBasicDetailsResult = await insertBasicDetails(Object.values(basicDetailsObj));

        // console.log(1, insertBasicDetailsResult);
        var eduDetailsObjSSC = {
            bDMId: insertBasicDetailsResult.insertId,
            eduType: "school",
            boardOrCourseName: req.body.ssc_board_name || "",
            university: "",
            passingYear: parseInt(req.body.ssc_passing_year) || 0,
            percentage: parseFloat(req.body.ssc_percentage) || 0,
            name: "ssc"
        }
        var eduDetailsObjHSC = {
            bDMId: insertBasicDetailsResult.insertId,
            eduType: "school",
            boardOrCourseName: req.body.hsc_board_name || "",
            university: "",
            passingYear: parseInt(req.body.hsc_passing_year) || 0,
            percentage: parseFloat(req.body.hsc_percentage) || 0,
            name: "hsc"

        }
        var eduDetailsObjBachelor = {
            bDMId: insertBasicDetailsResult.insertId,
            eduType: "university",
            boardOrCourseName: req.body.bachelor_course_name || "",
            university: req.body.bachelor_university || "",
            passingYear: parseInt(req.body.bachelor_passing_year) || 0,
            percentage: parseFloat(req.body.bachelor_percentage) || 0,
            name: "bachelor"

        }
        var eduDetailsObjMaster = {
            bDMId: insertBasicDetailsResult.insertId,
            eduType: "university",
            boardOrCourseName: req.body.master_course_name || "",
            university: req.body.master_university || "",
            passingYear: parseInt(req.body.master_passing_year) || 0,
            percentage: parseFloat(req.body.master_percentage) || 0,
            name: "master"
        }


        var insertEducationDetailsSSC = await insertEducationDetails(Object.values(eduDetailsObjSSC));
        var insertEducationDetailsHSC = await insertEducationDetails(Object.values(eduDetailsObjHSC));
        var insertEducationDetailsBachelor = await insertEducationDetails(Object.values(eduDetailsObjBachelor));
        if (req.body.master_course_name && req.body.master_university && req.body.master_passing_year && req.body.master_percentage) {
            var insertEducationDetailsMaster = await insertEducationDetails(Object.values(eduDetailsObjMaster));
        }


        var workExpCompanyNames = req.body.company_name;
        var workExpCompanyDesignations = req.body.designation_company;
        var workExpCompanyFromDate = req.body.from_date_company;
        var workExpCompanyToDate = req.body.to_date_company;


        var insertWorkExpResult = [];
        for (let i = 0; i < workExpCompanyNames.length; i++) {
            var temp = {
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

        var languages = [req.body.language_1 || [], req.body.language_2 || [], req.body.language_3 || []];
        // console.log(languages);
        var insertLanguageKnownResult = [];
        for (let j = 0; j < languages.length; j++) {
            for (let i = 1; i < languages[j].length; i++) {
                var temp = {
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

        var tech = [req.body.tech_1 || [], req.body.tech_2 || [], req.body.tech_3 || [], req.body.tech_4 || []];
        var insertTechResult = [];
        for (let j = 0; j < tech.length; j++) {
            if (tech[j].length === 2) {
                for (let i = 1; i < tech[j].length; i++) {
                    if (tech[j][0] === "php" || tech[j][0] === "mysql" || tech[j][0] === "laravel" || tech[j][0] === "oracle" || tech[j][1] === "beginer" || tech[j][1] === "mideator" || tech[j][1] === "expert") {
                        var temp = {
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

        var refNames = req.body.reference_name;
        var refContacts = req.body.reference_contact;
        var refRelations = req.body.reference_relation;


        var insertRefResult = [];
        for (let i = 0; i < refNames.length; i++) {
            var t = {
                bDMId: insertBasicDetailsResult.insertId,
                name: refNames[i],
                contactNumber: refContacts[i],
                relation: refRelations[i]
            }
            if (t.name != "" && t.contactNumber != "" && t.relation != "") {
                insertRefResult[i] = await insertReferenceDetails(Object.values(t));
            }
        }


        var preferencesResult = [];

        var preferedLocations = req.body.prefered_location;
        for (let i = 0; i < preferedLocations.length; i++) {
            var temp = {
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

        res.json({ result: 1 });

    } catch (error) {
        console.log(error);
    }
}

//rest all functions are for step by step submit
async function insertBasicDetailsRoute(req, res) {
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

        var insertBasicDetailsResult;
        var id = req.body.insertId;
        //checking if its update or insert (in case of next then prev then next -->its update not insert)
        if (id != -1) {
            var checkDataExist = await dataExistBybDMId("basicDetailsMaster", id);
            if (checkDataExist.length != 0 && checkDataExist[0].bDMId === id) {// its update (in case of user went to prev slide and then next slide)
                insertBasicDetailsResult = updateBasicDetailsRoute(req, res);
            }
        }
        else {//its new insert
            insertBasicDetailsResult = await insertBasicDetails(Object.values(basicDetailsObj));
            res.json({ insertId: insertBasicDetailsResult.insertId });
        }
        // console.log(reqBody);
    } catch (error) {
        console.log(error);
    }
}


async function insertEduDetailsRoute(req, res) {
    try {

        // console.log(req.body);
        var eduDetailsObjSSC = {
            bDMId: req.body.insertId,
            eduType: "school",
            boardOrCourseName: req.body.ssc_board_name || "",
            university: "",
            passingYear: parseInt(req.body.ssc_passing_year) || 0,
            percentage: parseFloat(req.body.ssc_percentage) || 0,
            name: "ssc"
        }
        var eduDetailsObjHSC = {
            bDMId: req.body.insertId,
            eduType: "school",
            boardOrCourseName: req.body.hsc_board_name || "",
            university: "",
            passingYear: parseInt(req.body.hsc_passing_year) || 0,
            percentage: parseFloat(req.body.hsc_percentage) || 0,
            name: "hsc"

        }
        var eduDetailsObjBachelor = {
            bDMId: req.body.insertId,
            eduType: "university",
            boardOrCourseName: req.body.bachelor_course_name || "",
            university: req.body.bachelor_university || "",
            passingYear: parseInt(req.body.bachelor_passing_year) || 0,
            percentage: parseFloat(req.body.bachelor_percentage) || 0,
            name: "bachelor"

        }
        var eduDetailsObjMaster = {
            bDMId: req.body.insertId,
            eduType: "university",
            boardOrCourseName: req.body.master_course_name || "",
            university: req.body.master_university || "",
            passingYear: parseInt(req.body.master_passing_year) || 0,
            percentage: parseFloat(req.body.master_percentage) || 0,
            name: "master"
        }

        var id = req.body.insertId;
        // console.log(id);
        //checking if its update or insert (in case of next then prev then next -->its update not insert)
        if (id != -1) {
            var checkDataExist = await dataExistBybDMId("eduDetailsMaster", id);
            // console.log(checkDataExist);
            if (checkDataExist.length != 0 && checkDataExist[0].bDMId === id) {// its update (in case of user went to prev slide and then next slide)
                updateEduDetailsRoute(req, res);
            }
            else {//its new insert
                var insertEducationDetailsSSC = await insertEducationDetails(Object.values(eduDetailsObjSSC));
                var insertEducationDetailsHSC = await insertEducationDetails(Object.values(eduDetailsObjHSC));
                var insertEducationDetailsBachelor = await insertEducationDetails(Object.values(eduDetailsObjBachelor));
                if (req.body.master_course_name && req.body.master_university && req.body.master_passing_year && req.body.master_percentage) {
                    var insertEducationDetailsMaster = await insertEducationDetails(Object.values(eduDetailsObjMaster));
                }
                res.json({ insertEducationDetailsSSC, insertEducationDetailsHSC, insertEducationDetailsBachelor });
            }
        }
    } catch (error) {
        console.log(error);
    }
}

async function insertWorkExpDetailsRoute(req, res) {
    try {
        var id = req.body.insertId;
        // console.log(id);
        // console.log("b",req.body);
        //checking if its update or insert (in case of next then prev then next -->its update not insert)
        if (id != -1) {
            var checkDataExist = await dataExistBybDMId("workExperienceMaster", id);
            // console.log(checkDataExist);
            if (checkDataExist.length != 0 && checkDataExist[0].bDMId === id) {// its update (in case of user went to prev slide and then next slide)
                updateWorkExpDetailsRoute(req, res);
            }
            else {//its new insert
                var workExpCompanyNames = req.body.company_name;
                var workExpCompanyDesignations = req.body.designation_company;
                var workExpCompanyFromDate = req.body.from_date_company;
                var workExpCompanyToDate = req.body.to_date_company;


                var insertWorkExpResult = [];
                for (let i = 0; i < workExpCompanyNames.length; i++) {
                    var temp = {
                        bDMId: req.body.insertId,
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
                res.json({ insertWorkExpResult });
            }
        }
    } catch (error) {
        console.log(error);
    }
}

async function insertLanguageDetailsRoute(req, res) {
    try {
        var id = req.body.insertId;
        // console.log(id);
        //checking if its update or insert (in case of next then prev then next -->its update not insert)
        if (id != -1) {
            var checkDataExist = await dataExistBybDMId("languageKnown", id);
            // console.log(checkDataExist);
            if (checkDataExist.length != 0 && checkDataExist[0].bDMId === id) {// its update (in case of user went to prev slide and then next slide)
                updateLanguageDetailsRoute(req, res);
            }
            else {//its new insert
                var languages = [req.body.language_1 || [], req.body.language_2 || [], req.body.language_3 || []];
                // console.log(languages);
                var insertLanguageKnownResult = [];
                for (let j = 0; j < languages.length; j++) {
                    for (let i = 1; i < languages[j].length; i++) {
                        var temp = {
                            bDMId: req.body.insertId,
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

                res.json({ insertLanguageKnownResult });
            }
        }
    } catch (error) {
        console.log(error);
    }
}
async function insertTechDetailsRoute(req, res) {
    try {
        var id = req.body.insertId;
        // console.log(id);
        //checking if its update or insert (in case of next then prev then next -->its update not insert)
        if (id != -1) {
            var checkDataExist = await dataExistBybDMId("technologiesKnown", id);
            // console.log(checkDataExist);
            if (checkDataExist.length != 0 && checkDataExist[0].bDMId === id) {// its update (in case of user went to prev slide and then next slide)
                updateTechDetailsRoute(req, res);
            }
            else {//its new insert
                var tech = [req.body.tech_1 || [], req.body.tech_2 || [], req.body.tech_3 || [], req.body.tech_4 || []];
                var insertTechResult = [];
                for (let j = 0; j < tech.length; j++) {
                    if (tech[j].length === 2) {
                        for (let i = 1; i < tech[j].length; i++) {
                            if (tech[j][0] === "php" || tech[j][0] === "mysql" || tech[j][0] === "laravel" || tech[j][0] === "oracle" || tech[j][1] === "beginer" || tech[j][1] === "mideator" || tech[j][1] === "expert") {
                                var temp = {
                                    bDMId: req.body.insertId,
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

                res.json({ insertTechResult });
            }
        }
    } catch (error) {
        console.log(error);
    }
}
async function insertPreferenceDetailsRoute(req, res) {
    try {
        var id = req.body.insertId;
        // console.log(id);
        //checking if its update or insert (in case of next then prev then next -->its update not insert)
        if (id != -1) {
            var checkDataExist = await dataExistBybDMId("preference", id);
            // console.log(checkDataExist);
            if (checkDataExist.length != 0 && checkDataExist[0].bDMId === id) {// its update (in case of user went to prev slide and then next slide)
                updatePreferenceDetailsRoute(req, res);
            }
            else {//its new insert
                var preferencesResult = [];

                var preferedLocations = req.body.prefered_location;
                for (let i = 0; i < preferedLocations.length; i++) {
                    var temp = {
                        bDMId: req.body.insertId,
                        preferedLocation: preferedLocations[i],
                        preferenceOrder: i + 1,
                        noticePeriod: parseFloat(req.body.notice_period),
                        expectedCTC: parseFloat(req.body.expected_ctc),
                        currentCTC: parseFloat(req.body.current_ctc),
                        department: req.body.department + ""
                    }

                    preferencesResult[i] = await insertPreferenceDetails(Object.values(temp));
                }

                res.json({ preferencesResult });
            }
        }
    } catch (error) {
        console.log(error);
    }
}
async function insertReferenceDetailsRoute(req, res) {
    try {
        var id = req.body.insertId;
        // console.log(id);
        //checking if its update or insert (in case of next then prev then next -->its update not insert)
        if (id != -1) {
            var checkDataExist = await dataExistBybDMId("referenceContact", id);
            // console.log(checkDataExist);
            if (checkDataExist.length != 0 && checkDataExist[0].bDMId === id) {// its update (in case of user went to prev slide and then next slide)
                updateReferenceDetailsRoute(req, res);
            }
            else {//its new insert
                var refNames = req.body.reference_name;
                var refContacts = req.body.reference_contact;
                var refRelations = req.body.reference_relation;


                var insertRefResult = [];
                for (let i = 0; i < refNames.length; i++) {
                    var t = {
                        bDMId: req.body.insertId,
                        name: refNames[i],
                        contactNumber: refContacts[i],
                        relation: refRelations[i]
                    }
                    if (t.name != "" && t.contactNumber != "" && t.relation != "") {
                        insertRefResult[i] = await insertReferenceDetails(Object.values(t));
                    }
                }

                res.json({ insertRefResult });
            }
        }
    } catch (error) {
        console.log(error);
    }
}



module.exports = { insertBasicDetailsRoute, insertEduDetailsRoute, insertForm, insertWorkExpDetailsRoute, insertLanguageDetailsRoute, insertTechDetailsRoute, insertPreferenceDetailsRoute, insertReferenceDetailsRoute };