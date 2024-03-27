function workExUpdateTable(action) {
    var workExTable = document.getElementById("workExTable");

    var trCount = workExTable.querySelectorAll("tr").length;
    if (action === "add") {
        trCount++;
        var newTrHtml = `
                            <td>
                                <label for="company_name_${trCount}">Company Name </label><input type="text"
                                    name="company_name" id="company_name_${trCount}" class="work_${trCount}" value=""/>
                            </td>
                            <td>
                                <label for="designation_company_${trCount}">Designation</label><input type="text"
                                    name="designation_company" id="designation_company_${trCount}" class="work_${trCount}"value="" />
                            </td>
                            <td>
                                <label for="from_date_company_${trCount}">From </label><input type="text"
                                    name="from_date_company" id="from_date_company_${trCount}" class="work_${trCount}" value=""/>
                            </td>
                            <td>
                                <label for="to_date_company_${trCount}">To </label><input type="text" name="to_date_company"
                                    id="to_date_company_${trCount}" class="work_${trCount}" value="" />
                            </td>
                        `
        var newTr = document.createElement("tr");
        newTr.innerHTML = newTrHtml;
        workExTable.appendChild(newTr);
    } else if (action === "remove") {
        if (trCount <= 3) return;
        workExTable.querySelectorAll("tr")[trCount - 1].remove();
        trCount--;
    }
}
function refUpdateTable(action) {
    var refTable = document.getElementById("refTable");

    var trCount = refTable.querySelectorAll("tr").length;
    if (action === "add") {
        trCount++;
        var newTrHtml = `
                    <td><label for="reference_${trCount}">Name </label><input type="text"
                            name="reference_name" id="reference_${trCount}_name"
                            class="ref_${trCount}" value="" /></td>
                    <td><label for="reference_${trCount}">Contact Number</label><input type="text"
                            name="reference_contact" id="reference_${trCount}_contact" class="ref_${trCount}%>"
                            value="" /></td>
                    <td><label for="reference_${trCount}">Relation</label><input type="text"
                            name="reference_relation" id="reference_${trCount}_relation"
                            class="ref_${trCount}" value="" />
                    </td>
        `
        var newTr = document.createElement("tr");
        newTr.innerHTML = newTrHtml;
        refTable.appendChild(newTr);
    } else if (action === "remove") {
        if (trCount <= 2) return;
        refTable.querySelectorAll("tr")[trCount - 1].remove();
        trCount--;
    }
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
        console.log(parent, text);
    }

}

function removeSupAndBrTag(parent) {
    if (parent.querySelector("br")) parent.querySelector("br").remove();
    if (parent.querySelector("sup")) {
        parent.querySelector("sup").remove();
    }
}
function validateForm() {
    var reqEmail = document.getElementsByClassName("reqEmail");

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
        } else if (reqEmail[i].value != "") {
            removeSupAndBrTag(inputTagParent)
        }
    }
    var reqPhone = document.getElementsByClassName("reqPhone");
    // console.log(reqPhone);
    for (let i = 0; i < reqPhone.length; i++) {
        var inputTagParent = reqPhone[i].parentNode;
        var val = reqPhone[i].value;
        if (val.length != 10) {
            addSupAndBrTag(inputTagParent, "Enter Phone Number properly");
            flag = 1;
        } else {
            removeSupAndBrTag(inputTagParent)
        }
    }

    var reqString = document.getElementsByClassName("reqString");
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
    console.log(language_1Arr);
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
    console.log(1, tech_1Arr);
    if ((tech_1Arr[0] || tech_1Arr[1] || tech_1Arr[2] || tech_1Arr[3]) && (!tech_1Arr[0] || !tech_1Arr[1] && !tech_1Arr[2] && !tech_1Arr[3])) {
        addSupAndBrTag(tech_1Tag[0].parentNode, "Select properly");
        flag = 1;
    } else {
        console.log("no");
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
    var work_1Tag = document.getElementsByClassName("work_1");
    var work_2Tag = document.getElementsByClassName("work_2");
    var work_3Tag = document.getElementsByClassName("work_3");
    var work_1Arr = [];
    var work_2Arr = [];
    var work_3Arr = [];
    for (let i = 0; i < work_1Tag.length; i++) {
        work_1Arr[i] = work_1Tag[i].value === "" ? null : work_1Tag[i].value;
        work_2Arr[i] = work_2Tag[i].value === "" ? null : work_2Tag[i].value;
        work_3Arr[i] = work_3Tag[i].value === "" ? null : work_3Tag[i].value;
    }
    console.log(work_1Arr);
    if ((work_1Arr[0] || work_1Arr[1] || work_1Arr[2] || work_1Arr[3]) && (!work_1Arr[0] || !work_1Arr[1] || !work_1Arr[2] || !work_1Arr[3])) {
        addSupAndBrTag(work_1Tag[0].parentNode, "Enter all details properly");
        flag = 1;
    } else {
        removeSupAndBrTag(work_1Tag[0].parentNode)
    }
    if ((work_2Arr[0] || work_2Arr[1] || work_2Arr[2] || work_2Arr[3]) && (!work_2Arr[0] || !work_2Arr[1] || !work_2Arr[2] || !work_2Arr[3])) {
        addSupAndBrTag(work_2Tag[0].parentNode, "Enter all details properly");
        flag = 1;
    } else {
        removeSupAndBrTag(work_2Tag[0].parentNode)
    }
    if ((work_3Arr[0] || work_3Arr[1] || work_3Arr[2] || work_3Arr[3]) && (!work_3Arr[0] || !work_3Arr[1] || !work_3Arr[2] || !work_3Arr[3])) {
        addSupAndBrTag(work_3Tag[0].parentNode, "Enter all details properly");
        flag = 1;
    } else {
        removeSupAndBrTag(work_3Tag[0].parentNode)
    }

    var edu_1Tag = document.getElementsByClassName("edu_1");
    var edu_2Tag = document.getElementsByClassName("edu_2");
    var edu_3Tag = document.getElementsByClassName("edu_3");
    var edu_4Tag = document.getElementsByClassName("edu_4");

    var edu_1Arr = [];
    var edu_2Arr = [];
    var edu_3Arr = [];
    var edu_4Arr = [];

    for (let i = 0; i < edu_1Tag.length; i++) {
        edu_1Arr[i] = edu_1Tag[i].value === "" ? null : edu_1Tag[i].value;
        edu_2Arr[i] = edu_2Tag[i].value === "" ? null : edu_2Tag[i].value;
    }
    for (let i = 0; i < edu_3Tag.length; i++) {
        edu_3Arr[i] = edu_3Tag[i].value === "" ? null : edu_3Tag[i].value;
        edu_4Arr[i] = edu_4Tag[i].value === "" ? null : edu_4Tag[i].value;
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



    var ref_1Tag = document.getElementsByClassName("ref_1");
    var ref_2Tag = document.getElementsByClassName("ref_2");
    var ref_1Arr = [];
    var ref_2Arr = [];
    for (let i = 0; i < ref_1Tag.length; i++) {
        ref_1Arr[i] = ref_1Tag[i].value === "" ? null : ref_1Tag[i].value;
        ref_2Arr[i] = ref_2Tag[i].value === "" ? null : ref_2Tag[i].value;
    }
    if ((ref_1Arr[0] || ref_1Arr[1] || ref_1Arr[2]) && (!ref_1Arr[0] || !ref_1Arr[1] || !ref_1Arr[2])) {
        addSupAndBrTag(ref_1Tag[0].parentNode, "Enter all details properly");
        flag = 1;
    } else {
        removeSupAndBrTag(ref_1Tag[0].parentNode)
    }
    if ((ref_2Arr[0] || ref_2Arr[1] || ref_2Arr[2]) && (!ref_2Arr[0] || !ref_2Arr[1] || !ref_2Arr[2])) {
        addSupAndBrTag(ref_2Tag[0].parentNode, "Enter all details properly");
        flag = 1;
    } else {
        removeSupAndBrTag(ref_2Tag[0].parentNode)
    }


    var reqInputs = document.getElementsByClassName("reqInput");
    var flag = 0;
    for (let i = 0; i < reqInputs.length; i++) {
        var inputTagParent = reqInputs[i].parentNode;
        if (reqInputs[i].value === "") {
            addSupAndBrTag(inputTagParent, "This field can't be empty");
            flag = 1;
        } else if ((reqInputs[i].classList.length === 1 && reqInputs[i].classList.contains("reqInput")) || (reqInputs[i].classList.contains("reqInput") && reqInputs[i].classList.contains("edu"))) {
            console.log(reqInputs[i].classList);
            removeSupAndBrTag(inputTagParent)
        }
    }

    if (flag) {
        return false;
    }
    return true;
}