const jwt = require("jsonwebtoken");

async function authorizationMiddleware(req, res, next) {
	try {
		let reqToken = req.cookies.token;
		if (!reqToken) {
			// return res.json({auth : false});
			// return res.status(401).json({
			//     auth : false,
			//     error : "invalid token try login again"
			// });
			return res.redirect("/");
		}
		try {
			let jwtVerify = jwt.verify(reqToken, process.env.TOKEN_SECRET);
			next();
		} catch (error) {
			// return res.json({auth : false});

			// return res.status(401).json({
			//     auth : false,
			//     error : "invalid token try login again"
			// });
			return res.redirect("/");
		}
	} catch (error) {
		console.log(error);
	}

}

module.exports = { authorizationMiddleware };