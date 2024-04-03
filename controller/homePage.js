
async function homePage(req, res) {
	try {
		res.render("homePage")
	} catch (error) {
		console.log(error);
	}
}

module.exports = homePage;