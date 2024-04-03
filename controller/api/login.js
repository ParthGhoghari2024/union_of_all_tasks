const { getLoginDataByUserEmail } = require("../../helper/dbHelperLogin");
let crypto = require('crypto');

const jwt = require("jsonwebtoken");
async function login(req, res) {
	try {
		let userEmail = req.body.email;
		let userPassword = req.body.password;
		if (!userEmail || !userPassword) {
			res.json({ result: false, error: "Submit all required details" });
			return;
		}
		let loginData = await getLoginDataByUserEmail(userEmail);
		let isActivated = loginData && loginData.length === 1 && loginData[0].activationStatus === 1;
		if (isActivated === false) {
			res.json({ result: false });
			return;
		}

		let passwordSalt = loginData[0].passwordSalt;
		let inputPasswordHashed = crypto.createHash("md5").update(userPassword + passwordSalt).digest("hex");
		let passwordCheck = inputPasswordHashed === loginData[0].password;

		let jwtToken = jwt.sign({ userEmail }, process.env.TOKEN_SECRET, {
			expiresIn: "1d",
		})

		res.cookie("token", jwtToken, {
			httpOnly: true, // The cookie only accessible by the web server
			maxAge: 1000 * 60 * 60 * 24,//Don't use this if you want to auto-logout at the closing of the browser  
			//If maxAge is unset, then the browser will store cookies as session cookies and will automatically delete them once the browser is closed.
			sameSite: true
		});
		res.json({ result: passwordCheck, token: jwtToken })
	} catch (error) {
		console.log(error);
	}
}

module.exports = { login };