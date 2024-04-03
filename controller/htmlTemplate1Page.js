
async function htmlTemplate1Page(req, res) {
	try {
		res.render("htmlTemplate1/")
	} catch (error) {
		console.log(error);
	}
}

module.exports = htmlTemplate1Page;