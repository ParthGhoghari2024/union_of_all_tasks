
async function logout(req, res) {
	try {
		// console.log(req);
		res.clearCookie("token");
		res.redirect("/");
	} catch (error) {
		console.log(error);
	}
}

module.exports = logout;