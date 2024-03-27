const { selectBasicDetails } = require("../../../helper/multistep_jobapp/dbHelperBasicDetails");
const { reducedSelectEducationDetails } = require("../../../helper/multistep_jobapp/dbHelperEducationDetails");
const { reducedSelectLanguage } = require("../../../helper/multistep_jobapp/dbHelperLanguageDetails");
const { reducedSelectPreferenceDetails } = require("../../../helper/multistep_jobapp/dbHelperPreferenceDetails");
const { reducedSelectReferenceDetails } = require("../../../helper/multistep_jobapp/dbHelperReferenceDetails");
const { reducedSelectTechDetails } = require("../../../helper/multistep_jobapp/dbHelperTechDetails");
const { reducedSelectWorkExpDetails } = require("../../../helper/multistep_jobapp/dbHelperWorkExpDetails");

async function getJobAppData(req, res) {
    try {
        // console.log(req.body);

        var queryId  = req.body.id;

        var basicDetails = await selectBasicDetails(queryId);
        // console.log(basicDetails);
        basicDetails = basicDetails[0];
        if(!basicDetails){
            return res.json({error:1,errorMsg:"invalid id"})
        }

        var eduDetails = await reducedSelectEducationDetails(queryId);
        // console.log(eduDetails);
        // console.log(basicDetails);
        var sscIndex = eduDetails.name.indexOf("ssc");
        var hscIndex = eduDetails.name.indexOf("hsc");
        var bachelorIndex = eduDetails.name.indexOf("bachelor");
        var masterIndex = eduDetails.name.indexOf("master");


        var workExpDetails = await reducedSelectWorkExpDetails(queryId);


        // console.log("{",workExpDetails);

        var languageDetails = await reducedSelectLanguage(queryId);
        // console.log(languageDetails);
        var techDetails = await reducedSelectTechDetails(queryId);
        // console.log(techDetails);

        var referenceDetails = await reducedSelectReferenceDetails(queryId);
        // console.log(referenceDetails);
        var preferenceDetails = await reducedSelectPreferenceDetails(queryId);
        // console.log(preferenceDetails);
        // console.log(preferenceDetails);



        var l1_index = languageDetails.langName.indexOf("hindi");
        var l1_arr = languageDetails.langName.filter((obj) => obj === "hindi")
        var l2_index = languageDetails.langName.indexOf("english");
        var l2_arr = languageDetails.langName.filter((obj) => obj === "english")
        var l3_index = languageDetails.langName.indexOf("gujarati");
        var l3_arr = languageDetails.langName.filter((obj) => obj === "gujarati")


        var t1_index = techDetails.technologyName.indexOf("php");
        var t2_index = techDetails.technologyName.indexOf("mysql");
        var t3_index = techDetails.technologyName.indexOf("laravel");
        var t4_index = techDetails.technologyName.indexOf("oracle");

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
            language_1: [languageDetails.langName[l1_index] , languageDetails.langLevel.slice(l1_index, l1_index + l1_arr.length)].flat() ,
            language_2: [languageDetails.langName[l2_index] , languageDetails.langLevel.slice(l2_index, l2_index + l2_arr.length)].flat() ,
            language_3: [languageDetails.langName[l3_index] , languageDetails.langLevel.slice(l3_index, l3_index + l3_arr.length)].flat() ,
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
            department: preferenceDetails.department || '',
            id:basicDetails.bDMId || -1
        }
        res.json({ reqBody: reqBody });

    } catch (error) {
        console.log(error);
    }
}

module.exports = {getJobAppData };