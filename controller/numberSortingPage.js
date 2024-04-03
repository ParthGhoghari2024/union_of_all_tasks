
async function numbersortingPage(req, res) {
	try {
		res.render("numbersorting/")
	} catch (error) {
		console.log(error);
	}
}

module.exports = numbersortingPage;