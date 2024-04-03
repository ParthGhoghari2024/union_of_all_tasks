async function sendRegistration() {
	var isValidatedRegForm = validateByTableId("registerTable");
	if (!isValidatedRegForm) {//if form data is not validated 
		return;
	}
	var formData = new FormData(document.getElementById("formRegister"));
	var body = {};
	formData.forEach(function (value, key) {
		body[key] = value;
	});
	var registerFetch = await fetch("/api/register", {
		method: "post",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body)
	})

	var registerResult = await registerFetch.json();
	// console.log(registerResult);
	var activationLinkTr = document.getElementById("activationLinkTr");
	activationLinkTr.style.display = "none";


	var errorMsgTag = document.getElementById("errorMsg");
	if (!registerResult) {
		// alert("wrong register details")
		errorMsgTag.innerText = "Something went wrong"
		return;
	}
	if (registerResult.registered === 0) {
		errorMsgTag.innerText = "Error : " + registerResult.error || "Something went wrong";
		return;
	}
	errorMsgTag.innerText = ""//this means no error
	var activationLinkTag = document.getElementById("activationLink");
	activationLinkTr.style.display = "block";
	var activationLink = `http://localhost:3000/activeUser?email=${registerResult.email}&token=${registerResult.activationToken}`;
	activationLinkTag.innerText = activationLink
	activationLinkTag.setAttribute("href", activationLink)

}
async function sendLogin() {
	var isValidatedLoginForm = validateByTableId("loginTable");
	if (!isValidatedLoginForm) {//if form data is not validated 
		return;
	}
	var formData = new FormData(document.getElementById("formLogin"));
	var body = {};
	formData.forEach(function (value, key) {
		body[key] = value;
	});
	var loginFetch = await fetch("/api/login", {
		method: "post",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body)
	})

	var loginResult = await loginFetch.json();
	// console.log(loginResult);

	if (loginResult && loginResult.result === true && loginResult.token) {

		// alert("logged in successfully")
		window.location = "/home"
	} else {
		alert((loginResult && loginResult.error) || "wrong username password")
	}

}
async function sendResetPassword() {
	var isValidatedRegForm = validateByTableId("newPasswordTable");
	if (!isValidatedRegForm) {//if form data is not validated 
		return;
	}
	var formData = new FormData(document.getElementById("formNewPassword"));
	var body = {};
	formData.forEach(function (value, key) {
		body[key] = value;
	});

	const urlParams = new URLSearchParams(window.location.search);
	body["email"] = urlParams.get("email");
	body["token"] = urlParams.get("token");

	var newPasswordFetch = await fetch("/api/newPassword", {
		method: "post",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body)
	})

	var newPasswordFetchResult = await newPasswordFetch.json();
	// console.log(newPasswordFetchResult);
	document.getElementById("errorMsg").innerHTML = "";
	document.getElementById("successMsg").innerHTML = "";
	if (newPasswordFetchResult) {
		if (newPasswordFetchResult.error === 1) {
			document.getElementById("errorMsg").innerText = "Something went wrong"
		} else {
			document.getElementById("successMsg").innerHTML = "Password changed <a href='/' >Login</a>"
		}
	}

}

async function sendForgotPassword() {
	document.getElementById("password").parentNode.style.display = "none"
	var forgotPasswordSpan = document.getElementById("forgotPasswordSpan")
	forgotPasswordSpan.innerText = "Send Link for resetting password "
	forgotPasswordSpan.style.background = "black"
	forgotPasswordSpan.style.color = "white";
	forgotPasswordSpan.style.padding = "1rem";
	forgotPasswordSpan.style.borderRadius = "10px";




	document.getElementById("loginBtn").style.display = "none";

	var emailTag = document.getElementById("email");
	var email = emailTag.value;
	var body = {
		email: email
	}
	var emailRegEx = /\S+@\S+\.\S+/;
	if (!email || email === "" || !emailRegEx.test(email)) {//if form data is not validated 
		addSupAndBrTag(emailTag.parentNode, "Enter email properly")
		return;
	} else {
		removeSupAndBrTag(emailTag.parentNode)
	}
	var forgotPasswordFetch = await fetch("/api/forgotPassword", {
		method: "post",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body)
	})

	var forgotPasswordResult = await forgotPasswordFetch.json();
	// console.log(forgotPasswordResult);
	var errorMsgTag = document.getElementById("errorMsg");
	if (!forgotPasswordResult) {
		// alert("wrong register details")
		errorMsgTag.innerText = "Something went wrong"
		return;
	}
	if (forgotPasswordResult.error === 1 || !forgotPasswordResult.forgotPasswordLink) {
		errorMsgTag.innerText = "Something went wrong";
		return;
	}
	errorMsgTag.innerText = ""//this means no error
	var activationLinkTag = document.getElementById("activationLink");
	activationLinkTr.style.display = "block";
	var activationLink = `${forgotPasswordResult.forgotPasswordLink}`;
	activationLinkTag.innerText = activationLink
	activationLinkTag.setAttribute("href", activationLink)
}
function validateByTableId(id) {
	var flag = 0;
	var table = document.getElementById(id);
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
	//note:uncomment below password validation 
	// var reqPassword = table.querySelectorAll("input[type=password]")
	// for (let i = 0; i < reqPassword.length; i++) {
	//     var inputTagParent = reqPassword[i].parentNode;

	//     var pwRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
	//     if (!pwRegEx.test(val)) {
	//         addSupAndBrTag(inputTagParent, "Password must be A minimum of 8 characters long must contain at least 1 uppercase, 1 lowercase letter, and 1 number.");
	//         flag = 1;
	//     } else{
	//         removeSupAndBrTag(inputTagParent)
	//     }
	// }




	if (flag) {
		return false;
	}
	return true;
}
function addSupAndBrTag(parent, text) {
	if (parent.querySelector("sup")) {
		parent.querySelector("sup").innerHTML = text
	} else {
		var brTag = document.createElement("br");
		var supTag = document.createElement("sup");
		supTag.innerHTML = text;
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