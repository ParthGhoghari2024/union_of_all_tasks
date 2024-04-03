
async function htmlTemplate2Page(req, res) {
	try {
		res.render("htmlTemplate2/")
	} catch (error) {
		console.log(error);
	}
}

module.exports = htmlTemplate2Page;