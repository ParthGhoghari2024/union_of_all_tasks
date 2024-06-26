const { getLoginDataByUserEmail, setActivationStatusByEmail, deleteLoginDataByUserEmail } = require("../helper/dbHelperLogin");

async function activeUserPage(req, res) {
	try {
		let email = req.query.email;
		let token = req.query.token;

		let userLoginData = await getLoginDataByUserEmail(email)

		let activationTimeLimitInHours = 4;
		if (userLoginData.length === 1) {
			userLoginData = userLoginData[0];
			if (token !== userLoginData.activationToken) {
				res.send("error: invalid token,email pair,recheck the  link ");
				return;
			}
			let tokenValidate = (Math.abs(new Date() - new Date(userLoginData.tokenGenerationTime)) / (3600 * 1000)) <= activationTimeLimitInHours;//1 hour = 3600 second and 1 second = 1000 miliseconds so 3600000

			let isAlreadyActive = userLoginData.activationStatus;
			if (!isAlreadyActive) {//if currently not activated
				//setting status of token to true or false in db
				let setActivationStatusByEmailResult = await setActivationStatusByEmail(tokenValidate, email);
				// console.log(setActivationStatusByEmailResult);
				if (tokenValidate === false) {//here time is expired and haven't activated yet
					//note: deleting this email's data  so it can re-register it
					let deleteLoginDataByUserEmailResult = await deleteLoginDataByUserEmail(email);
				}
				if (setActivationStatusByEmailResult && setActivationStatusByEmailResult.affectedRows === 1) {
					//if tokenValidate = true then error false and likewise
					res.render("activeUserPage", { email: email, error: tokenValidate ? 0 : 1 })
				}
				return;
			} else {
				//alredy activated
				res.render("activeUserPage", { email: email, error: 0 })
				return;
			}



		}

		res.render("activeUserPage", { email: email, error: 1 })


	} catch (error) {
		console.log(error);
	}
}

module.exports = activeUserPage;