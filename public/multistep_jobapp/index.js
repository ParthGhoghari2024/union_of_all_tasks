// var formData = new FormData( document.querySelector("form") )
var currentSlide = -1;
var resultOfSubmitSpan = document.getElementById("resultOfSubmitTag");
resultOfSubmitSpan.innerHTML = ""
window.onload = changeSlide(1);


var insertId = -1;

async function goToUpdate() {
    resultOfSubmitSpan.innerHTML = ""

    var id = document.getElementById("idText").value;
    var body = {
        id: id
    }
    var submit = await fetch("/multistep-jobapp/api/getJobAppData", {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(body)
    })

    var submitResult = await submit.json();

    if(submitResult && submitResult.error  ){
        alert("invalid id");
        return;
    }
    reqBody = submitResult.reqBody;

    var hiddenTag = document.getElementById("id");
    hiddenTag.value = submitResult.reqBody.id;

    console.log(hiddenTag);

    // console.log(9,submitResult);
    document.getElementById("actionText").innerText = "Update "
    //setting all tables for new req body
    //updating all the table's content with new data
    basicDetailsTableTag.innerHTML = generateBasicDetailsTable(reqBody);// all tags are var so hoisted to top 
    eduTableTag.innerHTML = generateEduTable(reqBody);
    workExTableTag.innerHTML = generateWorkTable(reqBody);
    langTableTag.innerHTML = generateLangTable(reqBody);
    techTableTag.innerHTML = generateTechTable(reqBody);
    RefTableTag.innerHTML = generateRefTable(reqBody);
    preferencesTableTag.innerHTML = generatePreferencesTable(reqBody);

    //moving to slide 1
    var inputTables = document.getElementsByClassName("inputTable");
    inputTables[currentSlide].classList.remove("activeTable");
    currentSlide = 0;
    inputTables[currentSlide].classList.add("activeTable");

}
function changeSlide(action) {
    reqBody = getReqBody();
    var inputTables = document.getElementsByClassName("inputTable");
    var totalSlideIndex = inputTables.length - 1;
    // console.log(inputTables, totalSlideIndex, currentSlide);

    //validating each table at next button on click
    if (currentSlide === 0 && !validateByTableName("basicDetailsTable")) return;
    if (currentSlide === 1 && !validateByTableName("eduTable")) return;
    if (currentSlide === 2 && !validateByTableName("workExTable")) return;
    if (currentSlide === 3 && !validateByTableName("langTable")) return;
    if (currentSlide === 4 && !validateByTableName("techTable")) return;
    if (currentSlide === 5 && !validateByTableName("refTable")) return;
    if (currentSlide === 6 && !validateByTableName("preferencesTable")) return;


    console.log(insertId);
    if (action === 1) {


        if (currentSlide < totalSlideIndex) {
            // console.log(currentSlide);
            currentSlide++;
            inputTables[currentSlide].classList.add("activeTable");
        }
        if (currentSlide > 0) {
            inputTables[currentSlide - 1].classList.remove("activeTable");
        }
    } else {
        if (currentSlide >= 1) {
            currentSlide--;
            inputTables[currentSlide].classList.add("activeTable");
        }
        if (currentSlide <= totalSlideIndex) {
            inputTables[currentSlide + 1].classList.remove("activeTable");
        }
    }
    // console.log(currentSlide);
    document.getElementById("prevBtn").disabled = false;
    document.getElementById("nextBtn").disabled = false;
    if (currentSlide === 0) {
        document.getElementById("prevBtn").disabled = true;
    }
    if (currentSlide === totalSlideIndex) {
        document.getElementById("nextBtn").value = "submit";
        if (reqBody.id && reqBody.id != -1) {
            document.getElementById("nextBtn").value = "update";
        }
        document.getElementById("nextBtn").addEventListener("click", submitForm);
    } else {
        document.getElementById("nextBtn").value = "next";
        document.getElementById("nextBtn").removeEventListener("click", submitForm)
    }
}



var basicDetailsTableTag = document.getElementById("basicDetailsTable")
basicDetailsTableTag.innerHTML = generateBasicDetailsTable(reqBody);

function generateBasicDetailsTable(reqBody) {
    console.log(reqBody);
    var basicDetailsHtml = "";

    basicDetailsHtml += ` 
    <tr>
        <td>
        <legend>Basic Details</legend>
        </td>
    </tr>
        <tr>
            <td>
                <label for="firstname">First Name </label>
                <input class="reqInput reqString" type="text" name="firstname" id="firstname"
                    value="${reqBody.firstname || "" || ""}" />
            </td>
            <td>
                <label for="lastname">Last Name </label>
                <input class="reqInput reqString" type="text" name="lastname" id="lastname"
                    value="${reqBody.lastname || ""}" />
            </td>
        </tr>

        <tr>
            <td>
                <label for="designation">Designation</label>
                <input class="reqInput reqString" type="text" name="designation"
                    id="designation" value="${reqBody.designation || ""}" />
            </td>
            <td>
                <label for="address1">Address1 </label>
                <textarea type="text" name="address1" id="address1"
                    class="reqInput reqString">${reqBody.address1 || ""}</textarea>
            </td>
        </tr>

        <tr>
            <td>
                <label for="email">Email</label>
                <input class="reqInput reqEmail" type="text" name="email" id="email"
                    value="${reqBody.email || ""}" />
            </td>
            <td>
                <label for="address2">Address2 </label>
                <textarea type="text" class="reqString" name="address2"
                    id="address2">${reqBody.address2 || ""}</textarea>
            </td>
        </tr>

        <tr>
            <td>
                <label for="phone">Phone Number</label><input class="reqInput reqPhone"
                    type="text" name="phone" id="phone" value="${reqBody.phone || ""}" />
            </td>
            <td>
                <label for="city">City </label><input class="reqInput" type="text" name="city"
                    id="city" value="${reqBody.city || ""}" />
            </td>
        </tr>

        <tr>
            <td>
                <label for="gender">Gender</label>
                <div>
                <input class="reqInput" type="radio" name="gender" id="gender_male" value="male" ${(!reqBody || !reqBody.gender || reqBody.gender !== "f") ? 'checked' : ''}
         /><label for="gender_male">Male</label>
        
    <input class="reqInput" type="radio" name="gender" id="gender_female" value="female" ${reqBody.gender === "f" ? 'checked' : ''} /><label
        for="gender_female" >Female</label></div>
            </td>
            <td>
                <label for="city">State</label>
                <select name="state" id="state" class="reqInput">
                    <option value="gujarat" ${reqBody.state === 'gujarat' ? 'selected' : ''}
                        >Gujarat</option>
                    <option value="maharastra" ${reqBody.state === 'maharastra' ? 'selected' : ''
        }>Maharastra</option>
                </select>
            </td>
        </tr>

        <tr>
            <td>
                <label for="relationship_status">Relationship Status</label>
                <select name="relationship_status" id="relationship_status" class="reqInput">
                    <option value="single" ${reqBody.relationship_status === 's' ? 'selected' : ''
        }>Single</option>
                    <option value="married" ${reqBody.relationship_status === 'm' ? 'selected'
            : ''}>Married</option>
                </select>

            </td>
            <td>
                <label for="dob">Date of birth(mm/dd/yyyyy)</label><input class="reqInput reqDate" type="text" placeholder="mm/dd/yyyy"
                    name="dob" id="dob" value="${reqBody.dob || ""}">
            </td>
        </tr>

`

    return basicDetailsHtml;
}

var eduTableTag = document.getElementById("eduTable")
eduTableTag.innerHTML = generateEduTable(reqBody);
// eduTableTag.classList.add("activeTable");


function generateEduTable(reqBody) {
    var eduTableHtml = "";

    eduTableHtml += `<tr>
    <td>
    <legend>Education Details</legend>
    </td>
    </tr>
    <tr>
        <td>SSC Result </td>
    </tr>
    <tr>
        <td>
            <label for="board_name">Name of board </label><input class="reqInput edu_1 edu"
                type="text" name="ssc_board_name" id="ssc_board_name"
                value="${reqBody.ssc_board_name || ""}" />
        </td>
        <td>
            <label for="passing_year">Passing Year </label><input class="reqInput edu_1 edu"
                type="text" name="ssc_passing_year" id="ssc_passing_year"
                value="${reqBody.ssc_passing_year || ""}" />
        </td>
        <td>
            <label for="percentage">Percentage </label><input class="reqInput edu_1 edu"
                type="text" name="ssc_percentage" id="ssc_percentage"
                value="${reqBody.ssc_percentage || ""}" />
        </td>
    </tr>   
    <tr>
        <td>HSC Result </td>
    </tr>
    <tr>
        <td>
            <label for="board_name">Name of board </label><input class="reqInput edu_2 edu"
                type="text" name="hsc_board_name" id="hsc_board_name"
                value="${reqBody.hsc_board_name || ""}" />
        </td>
        <td>
            <label for="passing_year">Passing Year </label><input class="reqInput edu_2 edu"
                type="text" name="hsc_passing_year" id="hsc_passing_year"
                value="${reqBody.hsc_passing_year || ""}" />
        </td>
        <td>
            <label for="percentage">Percentage </label><input class="reqInput edu_2 edu"
                type="text" name="hsc_percentage" id="hsc_percentage"
                value="${reqBody.hsc_percentage || ""}" />
        </td>
    </tr>   
    <tr>
        <td>Bachelor degree </td>
    </tr>
    <tr>
        <td>
            <label for="course_name">Course Name </label><input class="reqInput edu_3 edu"
                type="text" name="bachelor_course_name" id="bachelor_course_name"
                value="${reqBody.bachelor_course_name || ""}" />
        </td>
        <td>
            <label for="university">University</label><input class="reqInput edu_3 edu"
                type="text" name="bachelor_university" id="bachelor_university"
                value="${reqBody.bachelor_university || ""}" />
        </td>
        <td>
            <label for="passing_year">Passing Year </label><input class="reqInput edu_3 edu"
                type="text" name="bachelor_passing_year" id="bachelor_passing_year"
                value="${reqBody.bachelor_passing_year || ""}" />
        </td>
        <td>
            <label for="percentage">Percentage </label><input class="reqInput edu_3 edu"
                type="text" name="bachelor_percentage" id="bachelor_percentage"
                value="${reqBody.bachelor_percentage || ""}" />
        </td>
    </tr>   
    <tr>
        <td>Master degree </td>
    </tr>
    <tr>
        <td>
            <label for="course_name">Course Name </label><input type="text"
                name="master_course_name" id="master_course_name" class="edu_4 edu"
                value="${reqBody.master_course_name || ""}" />
        </td>
        <td>
            <label for="university">University</label><input type="text"
                name="master_university" id="master_university" class="edu_4 edu"
                value="${reqBody.master_university || ""}" />
        </td>
        <td>
            <label for="passing_year">Passing Year </label><input type="text"
                name="master_passing_year" id="master_passing_year" class="edu_4 edu"
                value="${reqBody.master_passing_year || ""}" />
        </td>
        <td>
            <label for="percentage">Percentage </label><input type="text"
                name="master_percentage" id="master_percentage" class="edu_4 edu"
                value="${reqBody.master_percentage || ""}" />
        </td>
    </tr>
`

    return eduTableHtml;


}

var workExTableTag = document.getElementById("workExTable");
workExTableTag.innerHTML = generateWorkTable(reqBody);
// workExTableTag.classList.add("activeTable");
function generateWorkTable(reqBody) {
    var workExTableHtml = "";
    var workLen = 3;
    if (reqBody && reqBody.workId) {
        workLen = reqBody.workId.length;
    }
    workExTableHtml += ` 
        <tr>
            <td>
            <legend>Work experience Details</legend>
            </td>
        </tr>`
    for (var i = 0; i < workLen; i++) {
        workExTableHtml += ` 
        
        <tr>
            <input type="hidden" name="workId" value="${(reqBody.workId && reqBody.workId[i]) ? reqBody.workId[i] : ""}">
            <td>
                <label for="company_name_${i + 1}">Company Name </label><input type="text"
                    name="company_name" id="company_name_${i + 1}" class="work_${i + 1}"
                    value="${(reqBody.company_name && reqBody.company_name[i]) ? reqBody.company_name[i] : ""}" />
            </td>
            <td>
                <label for="designation_company_${i + 1}">Designation</label><input
                    type="text" name="designation_company" id="designation_company_${i + 1}"
                    class="work_${i + 1}" value="${(reqBody.designation_company && reqBody.designation_company[i]) ? reqBody.designation_company[i] : ""}" />
            </td>
            <td>
                <label for="from_date_company_${i + 1}">From(mm/dd/yyyyy) </label><input type="text"
                    name="from_date_company" id="from_date_company_${i + 1}"
                    class="work_${i + 1} reqDate" value="${(reqBody.from_date_company && reqBody.from_date_company[i]) ? reqBody.from_date_company[i] : ""}" />
            </td>
            <td>
                <label for="to_date_company_${i}">To(mm/dd/yyyyy) </label><input type="text"
                    name="to_date_company" id="to_date_company_${i + 1}"
                    class="work_${i + 1} reqDate" value="${(reqBody.to_date_company && reqBody.to_date_company[i]) ? reqBody.to_date_company[i] : ""}" />
            </td>
        </tr>
        
        `

    }
    return workExTableHtml;

}

var langTableTag = document.getElementById("langTable");
langTableTag.innerHTML = generateLangTable(reqBody);
// langTableTag.classList.add("activeTable");
function generateLangTable(reqBody) {
    var langHtml = "";
    langHtml += `
        <tr>
            <td>
            <legend>Language Details</legend>
            </td>
        </tr>
    <tr style="display:flex;justify-content:center">
        <td >
            <div>
                <input class="reqInput reqCheck" type="checkbox" name="language_1"
                    id="language_1" value="hindi"
                    ${(reqBody.language_1 && reqBody.language_1.includes('hindi')) ? 'checked' : ''}><label
                    for="language_1">Hindi</label>
                <input class="reqInput reqCheck" type="checkbox" name="language_1"
                    id="language_1_read" value="read"
                    ${(reqBody.language_1 && reqBody.language_1.includes('read')) ? 'checked' : ''}><label
                    for="language_1_read">read</label>
                <input class="reqInput reqCheck" type="checkbox" name="language_1"
                    id="language_1_write" value="write"
                    ${(reqBody.language_1 && reqBody.language_1.includes('write')) ? 'checked' : ''}><label
                    for="language_1_write">write</label>
                <input class="reqInput reqCheck" type="checkbox" name="language_1"
                    id="language_1_speak" value="speak"
                    ${(reqBody.language_1 && reqBody.language_1.includes('speak')) ? 'checked' : ''}><label
                    for="language_1_speak">speak</label>
            </div>
        </td>
    <tr>
        <td>    
            <div>
                <input class="reqInput reqCheck" type="checkbox" name="language_2"
                    id="language_2" value="english"
                    ${(reqBody.language_2 && reqBody.language_2.includes('english')) ? 'checked' : ''}><label
                    for="language_2">English</label>
                <input class="reqInput reqCheck" type="checkbox" name="language_2"
                    id="language_2_read" value="read"
                    ${(reqBody.language_2 && reqBody.language_2.includes('read')) ? 'checked' : ''}><label
                    for="language_2_read">read</label>
                <input class="reqInput reqCheck" type="checkbox" name="language_2"
                    id="language_2_write" value="write"
                    ${(reqBody.language_2 && reqBody.language_2.includes('write')) ? 'checked' : ''}><label
                    for="language_2_write">write</label>
                <input class="reqInput reqCheck" type="checkbox" name="language_2"
                    id="language_2_speak" value="speak"
                    ${(reqBody.language_2 && reqBody.language_2.includes('speak')) ? 'checked' : ''}><label
                    for="language_2_speak">speak</label>
                </div>
        </td>
    </tr>
    <tr>
        <td>
            <div>
                <input class="reqInput reqCheck" type="checkbox" name="language_3"
                    id="language_3" value="gujarati"
                    ${(reqBody.language_3 && reqBody.language_3.includes('gujarati')) ? 'checked' : ''}><label
                    for="language_3">Gujarati</label>
                <input class="reqInput reqCheck" type="checkbox" name="language_3"
                    id="language_3_read" value="read"
                    ${(reqBody.language_3 && reqBody.language_3.includes('read')) ? 'checked' : ''}><label
                    for="language_3_read">read</label>
                <input class="reqInput reqCheck" type="checkbox" name="language_3"
                    id="language_3_write" value="write"
                    ${(reqBody.language_3 && reqBody.language_3.includes('write')) ? 'checked' : ''}><label
                    for="language_3_write">write</label>
                <input class="reqInput reqCheck" type="checkbox" name="language_3"
                    id="language_3_speak" value="speak"
                    ${(reqBody.language_3 && reqBody.language_3.includes('speak')) ? 'checked' : ''}><label
                    for="language_3_speak">speak</label>
            </div>
        </td>
    </tr>
    </tr>

            `
    return langHtml;
}

var techTableTag = document.getElementById("techTable");
techTableTag.innerHTML = generateTechTable(reqBody);
function generateTechTable(reqBody) {

    var techHtml = "";

    techHtml += `
    <tr>
            <td>
            <legend>Technology Details</legend>
            </td>
        </tr>
    <tr>
        <td><input class=" reqCheck" type="checkbox" name="tech_1" id="tech_1" value="php"
                ${(reqBody.tech_1 && reqBody.tech_1.includes('php')) ? 'checked' : ''}><label
                for="tech_1">PHP</label></td>
        <td><input class="reqInput reqCheck" type="radio" name="tech_1" id="tech_1_beginer"
                value="beginer" ${(reqBody.tech_1 && reqBody.tech_1.includes('beginer')) ? 'checked' : ''
        }><label for="tech_1_beginer">Beginer</label></td>
        <td><input class="reqInput reqCheck" type="radio" name="tech_1" id="tech_1_mideator"
                value="mideator" ${(reqBody.tech_1 && reqBody.tech_1.includes('mideator')) ? 'checked' : ''
        }><label for="tech_1_mideator">Mideator</label></td>
        <td><input class="reqInput reqCheck" type="radio" name="tech_1" id="tech_1_expert"
                value="expert" ${(reqBody.tech_1 && reqBody.tech_1.includes('expert')) ? 'checked' : ''
        }><label for="tech_1_expert">Expert</label></td>
    </tr>
    <tr>
        <td><input class="reqInput reqCheck" type="checkbox" name="tech_2" id="tech_2"
                value="mysql" ${(reqBody.tech_2 && reqBody.tech_2.includes('mysql')) ? 'checked' : ''}><label
                for="tech_2">Mysql</label></td>
        <td><input class="reqInput reqCheck" type="radio" name="tech_2" id="tech_2_beginer"
                value="beginer" ${(reqBody.tech_2 && reqBody.tech_2.includes('beginer')) ? 'checked' : ''
        }><label for="tech_2_beginer">Beginer</label></td>
        <td><input class="reqInput reqCheck" type="radio" name="tech_2" id="tech_2_mideator"
                value="mideator" ${(reqBody.tech_2 && reqBody.tech_2.includes('mideator')) ? 'checked' : ''
        }><label for="tech_2_mideator">Mideator</label></td>
        <td><input class="reqInput reqCheck" type="radio" name="tech_2" id="tech_2_expert"
                value="expert" ${(reqBody.tech_2 && reqBody.tech_2.includes('expert')) ? 'checked' : ''
        }><label for="tech_2_expert">Expert</label></td>
    </tr>
    <tr>
        <td><input class="reqInput reqCheck" type="checkbox" name="tech_3" id="tech_3"
                value="laravel" ${(reqBody.tech_3 && reqBody.tech_3.includes('laravel')) ? 'checked' : ''
        }><label for="tech_3">Laravel</label></td>
        <td><input class="reqInput reqCheck" type="radio" name="tech_3" id="tech_3_beginer"
                value="beginer" ${(reqBody.tech_3 && reqBody.tech_3.includes('beginer')) ? 'checked' : ''
        }><label for="tech_3_beginer">Beginer</label></td>
        <td><input class="reqInput reqCheck" type="radio" name="tech_3" id="tech_3_mideator"
                value="mideator" ${(reqBody.tech_3 && reqBody.tech_3.includes('mideator')) ? 'checked' : ''
        }><label for="tech_3_mideator">Mideator</label></td>
        <td><input class="reqInput reqCheck" type="radio" name="tech_3" id="tech_3_expert"
                value="expert" ${(reqBody.tech_3 && reqBody.tech_3.includes('expert')) ? 'checked' : ''
        }><label for="tech_3_expert">Expert</label></td>
    </tr>
    <tr>
        <td><input class="reqInput reqCheck" type="checkbox" name="tech_4" id="tech_4"
                value="oracle" ${(reqBody.tech_4 && reqBody.tech_4.includes('oracle')) ? 'checked' : ''
        }><label for="tech_4">Oracle</label></td>
        <td><input class="reqInput reqCheck" type="radio" name="tech_4" id="tech_4_beginer"
                value="beginer" ${(reqBody.tech_4 && reqBody.tech_4.includes('beginer')) ? 'checked' : ''
        }><label for="tech_4_beginer">Beginer</label></td>
        <td><input class="reqInput reqCheck" type="radio" name="tech_4" id="tech_4_mideator"
                value="mideator" ${(reqBody.tech_4 && reqBody.tech_4.includes('mideator')) ? 'checked' : ''
        }><label for="tech_4_mideator">Mideator</label></td>
        <td><input class="reqInput reqCheck" type="radio" name="tech_4" id="tech_4_expert"
                value="expert" ${(reqBody.tech_4 && reqBody.tech_4.includes('expert')) ? 'checked' : ''
        }><label for="tech_4_expert">Expert</label></td>
    </tr>`

    return techHtml;
}

var RefTableTag = document.getElementById("refTable");
RefTableTag.innerHTML = generateRefTable(reqBody);

function generateRefTable(reqBody) {
    var refHtml = "";
    var refLen = 2;
    if (reqBody.reference_name) {
        refLen = reqBody.reference_name.length;
    }
    refHtml += `
    <tr>
        <td>
        <legend>References Details</legend>
        </td>
    </tr>`
    for (var i = 0; i < refLen; i++) {
        refHtml += `
       
        <tr>
            <input type="hidden" name="refId" value="${(reqBody.refId && reqBody.refId[i]) ? reqBody.refId[i] : ""}">
            <td><label for="reference_${i + 1}">Name </label><input type="text"
                    name="reference_name" id="reference_${i + 1}_name"
                    class="ref_${i + 1}" value="${(reqBody.reference_name && reqBody.reference_name[i]) ? reqBody.reference_name[i] : ""}" /></td>
            <td><label for="reference_${i + 1}">Contact Number</label><input type="text"
                    name="reference_contact" id="reference_1_contact" class="ref_${i + 1} reqPhone"
                    value="${(reqBody.reference_contact && reqBody.reference_contact[i]) ? reqBody.reference_contact[i] : ""}" /></td>
            <td><label for="reference_${i + 1}">Relation</label><input type="text"
                    name="reference_relation" id="reference_${i + 1}_relation"
                    class="ref_${i + 1}" value="${(reqBody.reference_relation && reqBody.reference_relation[i]) ? reqBody.reference_relation[i] : ""}" />
            </td>
        </tr>
                `
    }

    return refHtml;
}

var preferencesTableTag = document.getElementById("preferencesTable");
preferencesTableTag.innerHTML = generatePreferencesTable(reqBody);
function generatePreferencesTable(reqBody) {
    var preferencesHtml = "";

    preferencesHtml += `
        <tr>
            <td>
            <legend>Preferences  Details</legend>
            </td>
        </tr>
        <td>
            <tr>
                <td><label for="prefered_location">Prefered Location : </label></td>
            </tr>
            <tr>
                <td>
                    <input type="hidden" name="prefId" value="${(reqBody.prefId && reqBody.prefId[0]) ? reqBody.prefId[0] : ""}">
                    <input class="reqInput" type="text" name="prefered_location"
                        id="prefered_location_1" placeholder="Prefered Location 1"
                        value="${(reqBody.prefered_location && reqBody.prefered_location[0]) ? reqBody.prefered_location[0] : ""}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input type="hidden" name="prefId" value="${(reqBody.prefId && reqBody.prefId[1]) ? reqBody.prefId[1] : ""}">
                    <input class="reqInput" type="text" name="prefered_location"
                        id="prefered_location_2" placeholder="Prefered Location 2"
                        value="${(reqBody.prefered_location && reqBody.prefered_location[0]) ? reqBody.prefered_location[1] : ""}" />
                </td>
            </tr>
            <tr>
                <td>
                    <input type="hidden" name="prefId" value="${(reqBody.prefId && reqBody.prefId[2]) ? reqBody.prefId[2] : ""}">
                    <input class="reqInput" type="text" name="prefered_location"
                        id="prefered_location_3" placeholder="Prefered Location 3"
                        value="${(reqBody.prefered_location && reqBody.prefered_location[0]) ? reqBody.prefered_location[2] : ""}" />
                </td>
            </tr>
        </td>
        <table>
            <tr>
                <td><label for="notice_period">Notice Period </label><input class="reqInput"
                        type="text" name="notice_period" id="notice_period"
                        value="${reqBody.notice_period || ""}"></td>
            </tr>
            <tr>
                <td><label for="expeted_ctc">Expected CTC </label><input class="reqInput"
                        type="text" name="expected_ctc" id="expected_ctc"
                        value="${reqBody.expected_ctc || ""}"></td>
            </tr>
            <tr>
                <td><label for="current_ctc">Current CTC </label><input class="reqInput"
                        type="text" name="current_ctc" id="current_ctc"
                        value="${reqBody.current_ctc || ""}"></td>
            </tr>
        </table>
        <table>
            <tr>
                <td style="display: flex;justify-content: center ; gap:0 1rem">
                    <label for="department">Department : </label>
                    <select name="department" id="department" multiple class="reqInput">
                        <option value="development"
                            ${(reqBody.department && reqBody.department.includes('development')) ? 'selected' : ''}
                            >Development</option>
                        <option value="marketing"
                            ${(reqBody.department && reqBody.department.includes('marketing')) ? 'selected' : ''}
                            >Marketing</option>
                    </select>
                </td>
            </tr>
        </table>
                `

    return preferencesHtml;
}

function addSupAndBrTag(parent, text) {
    if (parent.querySelector("sup")) {
        parent.querySelector("sup").innerHTML = text
    } else {
        var supTag = document.createElement("sup");
        supTag.innerHTML = text;
        var brTag = document.createElement("br");
        parent.appendChild(brTag)
        parent.appendChild(supTag)
        // console.log(parent, text);
    }

}

function removeSupAndBrTag(parent) {
    if (parent.querySelector("br")) parent.querySelector("br").remove();
    if (parent.querySelector("sup")) {
        parent.querySelector("sup").remove();
    }
}

function validateByTableName(name) {
    var flag = 0;
    var table = document.getElementById(name);
    var reqEmail = table.getElementsByClassName("reqEmail");
    for (let i = 0; i < reqEmail.length; i++) {
        var inputTagParent = reqEmail[i].parentNode;
        var val = reqEmail[i].value;
        var emailRegEx = /\S+@\S+\.\S+/;
        if (!emailRegEx.test(val)) {
            if (inputTagParent.querySelector("sup")) {
                inputTagParent.querySelector("sup").innerHTML = "Enter email properly"
            } else {
                addSupAndBrTag(inputTagParent, "Enter email properly");
            }
            flag = 1;
        } else if (reqEmail[i].value.trim() != "") {
            removeSupAndBrTag(inputTagParent)
        }
    }
    var reqPhone = table.getElementsByClassName("reqPhone");
    // console.log(reqPhone);
    for (let i = 0; i < reqPhone.length; i++) {
        var inputTagParent = reqPhone[i].parentNode;
        var val = reqPhone[i].value;
        if(val==="")continue;
        if (val.length != 10) {
            addSupAndBrTag(inputTagParent, "Enter Phone Number properly");
            flag = 1;
        } else {
            removeSupAndBrTag(inputTagParent)
        }
    }

    var reqString = table.getElementsByClassName("reqString");
    for (let i = 0; i < reqString.length; i++) {
        var inputTagParent = reqString[i].parentNode;
        var val = reqString[i].value;
        if (!isNaN(parseInt(val))) {
            addSupAndBrTag(inputTagParent, "Enter Strings only");
            flag = 1;
        } else {
            removeSupAndBrTag(inputTagParent)
        }
    }

    var reqDate = table.getElementsByClassName("reqDate");
    for (let i = 0; i < reqDate.length; i++) {
        var inputTagParent = reqDate[i].parentNode;
        var val = reqDate[i].value;
        if (val === "" && !reqDate[i].classList.contains("reqInput")) continue;
        var date_regex = /^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
        if (!date_regex.test(val)) {
            if (inputTagParent.querySelector("sup")) {
                inputTagParent.querySelector("sup").innerHTML = "Enter date properly"
            } else {
                addSupAndBrTag(inputTagParent, "Enter date properly");
            }
            flag = 1;
        } else if (reqDate[i].value.trim() != "") {
            removeSupAndBrTag(inputTagParent)
        }

    }
    var reqInputs = table.getElementsByClassName("reqInput");
    for (let i = 0; i < reqInputs.length; i++) {
        var inputTagParent = reqInputs[i].parentNode;
        if (reqInputs[i].value === "") {
            addSupAndBrTag(inputTagParent, "This field can't be empty");
            flag = 1;
        } else if ((reqInputs[i].classList.length === 1 && reqInputs[i].classList.contains("reqInput")) || (reqInputs[i].classList.contains("reqInput") && reqInputs[i].classList.contains("edu"))) {
            // console.log(reqInputs[i].classList);
            removeSupAndBrTag(inputTagParent)
        }
    }

    if (name === "eduTable") {
        var edu_1Tag = document.getElementsByClassName("edu_1");
        var edu_2Tag = document.getElementsByClassName("edu_2");
        var edu_3Tag = document.getElementsByClassName("edu_3");
        var edu_4Tag = document.getElementsByClassName("edu_4");

        var edu_1Arr = [];
        var edu_2Arr = [];
        var edu_3Arr = [];
        var edu_4Arr = [];

        for (let i = 0; i < edu_1Tag.length; i++) {
            edu_1Arr[i] = edu_1Tag[i].value.trim() === "" ? null : edu_1Tag[i].value;
            edu_2Arr[i] = edu_2Tag[i].value.trim() === "" ? null : edu_2Tag[i].value;
        }
        for (let i = 0; i < edu_3Tag.length; i++) {
            edu_3Arr[i] = edu_3Tag[i].value.trim() === "" ? null : edu_3Tag[i].value;
            edu_4Arr[i] = edu_4Tag[i].value.trim() === "" ? null : edu_4Tag[i].value;
        }
        if ((edu_1Arr[0] || edu_1Arr[1] || edu_1Arr[2]) && (!edu_1Arr[0] || !edu_1Arr[1] || !edu_1Arr[2])) {
            addSupAndBrTag(edu_1Tag[0].parentNode, "Enter all details properly");
            flag = 1;
        } else {
            removeSupAndBrTag(edu_1Tag[0].parentNode)
        }
        if ((edu_2Arr[0] || edu_2Arr[1] || edu_2Arr[2]) && (!edu_2Arr[0] || !edu_2Arr[1] || !edu_2Arr[2])) {
            addSupAndBrTag(edu_2Tag[0].parentNode, "Enter all details properly");
            flag = 1;
        } else {
            removeSupAndBrTag(edu_2Tag[0].parentNode)
        }
        if ((edu_3Arr[0] || edu_3Arr[1] || edu_3Arr[2] || edu_3Arr[3]) && (!edu_3Arr[0] || !edu_3Arr[1] || !edu_3Arr[2] || !edu_3Arr[3])) {
            addSupAndBrTag(edu_3Tag[0].parentNode, "Enter all details properly");
            flag = 1;
        } else {
            removeSupAndBrTag(edu_3Tag[0].parentNode)
        }
        if ((edu_4Arr[0] || edu_4Arr[1] || edu_4Arr[2] || edu_4Arr[3]) && (!edu_4Arr[0] || !edu_4Arr[1] || !edu_4Arr[2] || !edu_4Arr[3])) {
            addSupAndBrTag(edu_4Tag[0].parentNode, "Enter all details properly");
            flag = 1;
        } else {
            removeSupAndBrTag(edu_4Tag[0].parentNode)
        }
    }
    if (name === "langTable") {
        var language_1Tag = document.getElementsByName("language_1");
        var language_2Tag = document.getElementsByName("language_2");
        var language_3Tag = document.getElementsByName("language_3");

        var language_1Arr = [];
        var language_2Arr = [];
        var language_3Arr = [];

        for (let i = 0; i < language_1Tag.length; i++) {
            language_1Arr[i] = language_1Tag[i].checked;
            language_2Arr[i] = language_2Tag[i].checked;
            language_3Arr[i] = language_3Tag[i].checked;
        }
        // console.log(language_1Arr);
        if ((language_1Arr[0] || language_1Arr[1] || language_1Arr[2] || language_1Arr[3]) && (!language_1Arr[0] || !language_1Arr[1] && !language_1Arr[2] && !language_1Arr[3])) {
            addSupAndBrTag(language_1Tag[0].parentNode, "Select properly");
            flag = 1;
        } else {
            removeSupAndBrTag(language_1Tag[0].parentNode)
        }
        if ((language_2Arr[0] || language_2Arr[1] || language_2Arr[2] || language_2Arr[3]) && (!language_2Arr[0] || !language_2Arr[1] && !language_2Arr[2] && !language_2Arr[3])) {
            addSupAndBrTag(language_2Tag[0].parentNode, "Select properly");
            flag = 1;
        } else {
            removeSupAndBrTag(language_2Tag[0].parentNode)
        }
        if ((language_3Arr[0] || language_3Arr[1] || language_3Arr[2] || language_3Arr[3]) && (!language_3Arr[0] || !language_3Arr[1] && !language_3Arr[2] && !language_3Arr[3])) {
            addSupAndBrTag(language_3Tag[0].parentNode, "Select properly");
            flag = 1;
        } else {
            removeSupAndBrTag(language_3Tag[0].parentNode)
        }
    }

    if (name === "techTable") {
        var tech_1Tag = document.getElementsByName("tech_1");
        var tech_2Tag = document.getElementsByName("tech_2");
        var tech_3Tag = document.getElementsByName("tech_3");
        var tech_4Tag = document.getElementsByName("tech_4");


        var tech_1Arr = [];
        var tech_2Arr = [];
        var tech_3Arr = [];
        var tech_4Arr = [];


        for (let i = 0; i < tech_1Tag.length; i++) {
            tech_1Arr[i] = tech_1Tag[i].checked;
            tech_2Arr[i] = tech_2Tag[i].checked;
            tech_3Arr[i] = tech_3Tag[i].checked;
            tech_4Arr[i] = tech_4Tag[i].checked;

        }
        // console.log(1, tech_1Arr);
        if ((tech_1Arr[0] || tech_1Arr[1] || tech_1Arr[2] || tech_1Arr[3]) && (!tech_1Arr[0] || !tech_1Arr[1] && !tech_1Arr[2] && !tech_1Arr[3])) {
            addSupAndBrTag(tech_1Tag[0].parentNode, "Select properly");
            flag = 1;
        } else {
            // console.log("no");
            removeSupAndBrTag(tech_1Tag[0].parentNode)
        }
        if ((tech_2Arr[0] || tech_2Arr[1] || tech_2Arr[2] || tech_2Arr[3]) && (!tech_2Arr[0] || !tech_2Arr[1] && !tech_2Arr[2] && !tech_2Arr[3])) {
            addSupAndBrTag(tech_2Tag[0].parentNode, "Select properly");
            flag = 1;
        } else {
            removeSupAndBrTag(tech_2Tag[0].parentNode)
        }
        if ((tech_3Arr[0] || tech_3Arr[1] || tech_3Arr[2] || tech_3Arr[3]) && (!tech_3Arr[0] || !tech_3Arr[1] && !tech_3Arr[2] && !tech_3Arr[3])) {
            addSupAndBrTag(tech_3Tag[0].parentNode, "Select properly");
            flag = 1;
        } else {
            removeSupAndBrTag(tech_3Tag[0].parentNode)
        }
        if ((tech_4Arr[0] || tech_4Arr[1] || tech_4Arr[2] || tech_4Arr[3]) && (!tech_4Arr[0] || !tech_4Arr[1] && !tech_4Arr[2] && !tech_4Arr[3])) {
            addSupAndBrTag(tech_4Tag[0].parentNode, "Select properly");
            flag = 1;
        } else {
            removeSupAndBrTag(tech_4Tag[0].parentNode)
        }

    }
    if (name === "workExTable") {

        var work_1Tag = document.getElementsByClassName("work_1");
        var work_2Tag = document.getElementsByClassName("work_2");
        var work_3Tag = document.getElementsByClassName("work_3");
        var work_1Arr = [];
        var work_2Arr = [];
        var work_3Arr = [];
        for (let i = 0; i < work_1Tag.length; i++) {
            if (work_1Tag && work_1Tag[i]) {
                work_1Arr[i] = work_1Tag[i].value === "" ? null : work_1Tag[i].value;
            } else {
                work_1Arr[i] = null;
            }
            if (work_2Tag && work_2Tag[i]) {
                work_2Arr[i] = work_2Tag[i].value === "" ? null : work_2Tag[i].value;
            } else {
                work_2Arr[i] = null;
            }
            if (work_3Tag && work_3Tag[i]) {
                work_3Arr[i] = work_3Tag[i].value === "" ? null : work_3Tag[i].value;
            } else {
                work_3Arr[i] = null;
            }
        }
        if (work_1Tag && work_1Tag[0]) {
            if ((work_1Arr[0] || work_1Arr[1] || work_1Arr[2] || work_1Arr[3]) && (!work_1Arr[0] || !work_1Arr[1] || !work_1Arr[2] || !work_1Arr[3])) {
                addSupAndBrTag(work_1Tag[0].parentNode, "Enter all details properly");
                flag = 1;
            } else {
                removeSupAndBrTag(work_1Tag[0].parentNode)
            }
        }
        if (work_2Tag && work_2Tag[0]) {
            if ((work_2Arr[0] || work_2Arr[1] || work_2Arr[2] || work_2Arr[3]) && (!work_2Arr[0] || !work_2Arr[1] || !work_2Arr[2] || !work_2Arr[3])) {
                addSupAndBrTag(work_2Tag[0].parentNode, "Enter all details properly");
                flag = 1;
            } else {
                removeSupAndBrTag(work_2Tag[0].parentNode)
            }
        }
        if (work_3Tag && work_3Tag[0]) {
            if ((work_3Arr[0] || work_3Arr[1] || work_3Arr[2] || work_3Arr[3]) && (!work_3Arr[0] || !work_3Arr[1] || !work_3Arr[2] || !work_3Arr[3])) {
                addSupAndBrTag(work_3Tag[0].parentNode, "Enter all details properly");
                flag = 1;
            } else {
                removeSupAndBrTag(work_3Tag[0].parentNode)
            }
        }
    }
    if (name === "refTable") {
        var ref_1Tag = document.getElementsByClassName("ref_1");
        var ref_2Tag = document.getElementsByClassName("ref_2");
        var ref_1Arr = [];
        var ref_2Arr = [];
        for (let i = 0; i < ref_1Tag.length; i++) {
            ref_1Arr[i] = ref_1Tag[i].value.trim() === "" ? null : ref_1Tag[i].value;
            ref_2Arr[i] = ref_2Tag[i].value.trim() === "" ? null : ref_2Tag[i].value;
        }
        if ((ref_1Arr[0] || ref_1Arr[1] || ref_1Arr[2]) && (!ref_1Arr[0] || !ref_1Arr[1] || !ref_1Arr[2])) {
            addSupAndBrTag(ref_1Tag[0].parentNode, "Enter all details properly");
            flag = 1;
        } else {
            if (ref_1Tag && ref_1Tag[0]) removeSupAndBrTag(ref_1Tag[0].parentNode)
        }
        if ((ref_2Arr[0] || ref_2Arr[1] || ref_2Arr[2]) && (!ref_2Arr[0] || !ref_2Arr[1] || !ref_2Arr[2])) {
            addSupAndBrTag(ref_2Tag[0].parentNode, "Enter all details properly");
            flag = 1;
        } else {
            if (ref_2Tag && ref_2Tag[0]) removeSupAndBrTag(ref_2Tag[0].parentNode)
        }
        // console.log(ref_1Arr, ref_2Arr);
    }

    if (name === "preferencesTable") {

    }
    if (flag) {
        return false;
    }
    return true;
}
function getReqBody() {
    var formData = new FormData(document.querySelector("form"))
    // formData = formData.values();
    // console.log(10,formData);
    var reqBody = {};
    for (const entry of formData) {
        // console.log(entry[0], entry[1]); // Array: ['entryName', 'entryValue']
        if (entry[0] === "bachelor_passing_year" || entry[0] === "bachelor_percentage" || entry[0] === "current_ctc" || entry[0] === "ssc_passing_year" || entry[0] === "ssc_percentage" || entry[0] === "hsc_passing_year" || entry[0] === "hsc_percentage" || entry[0] === "master_passing_year" || entry[0] === "master_percentage" || entry[0] === "workId" || entry[0] === "refId" || entry[0] === "prefId" || entry[0] === "notice_period" || entry[0] === "expected_ctc") {
            entry[1] = Number(entry[1]);
        }
        if (reqBody[entry[0]]) {//converting multiple values to array , if single then retaining as it is
            if (typeof (reqBody[entry[0]]) !== "object") reqBody[entry[0]] = [reqBody[entry[0]]];
            reqBody[entry[0]].push(entry[1])
        } else reqBody[entry[0]] = entry[1]

        if (reqBody.workId && typeof (reqBody.workId) === "number") reqBody.workId = [reqBody.workId];
        if (reqBody.company_name && typeof (reqBody.company_name) === "string") reqBody.company_name = [reqBody.company_name];
        if (reqBody.designation_company && typeof (reqBody.designation_company) === "string") reqBody.designation_company = [reqBody.designation_company];
        if (reqBody.from_date_company && typeof (reqBody.from_date_company) === "string") reqBody.from_date_company = [reqBody.from_date_company];
        if (reqBody.to_date_company && typeof (reqBody.to_date_company) === "string") reqBody.to_date_company = [reqBody.to_date_company];

        if (reqBody.refId && typeof (reqBody.refId) === "number") reqBody.refId = [reqBody.refId];
        if (reqBody.reference_name && typeof (reqBody.reference_name) === "string") reqBody.reference_name = [reqBody.reference_name];
        if (reqBody.reference_contact && typeof (reqBody.reference_contact) === "string") reqBody.reference_contact = [reqBody.reference_contact];
        if (reqBody.reference_relation && typeof (reqBody.reference_relation) === "string") reqBody.reference_relation = [reqBody.reference_relation];


        if (reqBody.department) {
            reqBody.department = reqBody.department + ""
        }
    }

    return reqBody;
}
async function submitForm() {

    // console.log(reqBody);
    var submit;
    var isUpdate = 0;
    // console.log(11, reqBody);
    if (reqBody && reqBody.id && reqBody.id != -1) {
        // console.log(1, reqBody.id);
        submit = await fetch("/multistep-jobapp/api/updateJobApp", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(reqBody)
        })

        isUpdate = 1;
    } else {
        // console.log(2, reqBody.id);
        submit = await fetch("/multistep-jobapp/api/submitJobApp", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(reqBody)
        })
    }



    var submitResult = await submit.json();

    if (submitResult.result === 1) {
        // window.location = "/"
        var resultOfSubmitSpan = document.getElementById("resultOfSubmitTag");
        if (isUpdate === 0) resultOfSubmitSpan.innerHTML = "inserted Succefully";
        else resultOfSubmitSpan.innerHTML = "updated Succefully";
        resultOfSubmitSpan.innerHTML += " <a href='/'>insert new </a>"
    }

    // console.log(submitResult);
}