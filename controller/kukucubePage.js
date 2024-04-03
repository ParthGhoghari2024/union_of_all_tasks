
async function kukucubePage(req, res) {
	try {
		res.render("kukucube/")
	} catch (error) {
		console.log(error);
	}
}

module.exports = kukucubePage;