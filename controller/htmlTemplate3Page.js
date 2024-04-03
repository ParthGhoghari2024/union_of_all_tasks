
async function htmlTemplate3Page(req, res) {
	try {
		res.render("htmlTemplate3/")
	} catch (error) {
		console.log(error);
	}
}

module.exports = htmlTemplate3Page;