const { getLoginDataByUserEmail, updatePasswordByEmail } = require("../../helper/dbHelperLogin");
let crypto = require('crypto');

async function newPassword(req, res) {
	try {
		// console.log(req.body);
		let userPassword = req.body.password;
		let confirmPassword = req.body.confirmPassword;
		let userEmail = req.body.email;
		let token = req.body.token;
		// console.log(token);
		let loginData = await getLoginDataByUserEmail(userEmail);
		let isActivated = loginData && loginData.length === 1 && loginData[0].activationStatus === 1;
		if (userPassword != confirmPassword) {
			res.json({ error: 1 });
			return;
		}

		if (isActivated === false) {
			res.json({ error: 1 });
			return;
		}
		if (token !== loginData[0].activationToken) {
			res.json({ error: 1 });
			return;
		}
		let activationTimeLimitInHours = 4;
		let tokenValidate = (Math.abs(new Date() - new Date(loginData[0].tokenGenerationTime)) / (3600 * 1000)) <= activationTimeLimitInHours;
		if (tokenValidate === false) {//forgot password token expired
			res.json({ error: 1, errorMsg: "Token Expired" })
			return;
		}
		let passwordSalt = loginData[0].passwordSalt;
		let passwordHashed = crypto.createHash("md5").update(userPassword + passwordSalt).digest("hex");
		let updatePasswordResult = await updatePasswordByEmail([passwordHashed, userEmail])

		if (updatePasswordResult || updatePasswordResult.affectedRows === 1) {
			res.json({ error: 0 })
			return;
		}
		res.json({ error: 1 })
	} catch (error) {
		console.log(error);
	}
}

module.exports = { newPassword };