
async function eventTablePage(req, res) {
	try {
		res.render("eventtable/")
	} catch (error) {
		console.log(error);
	}
}

module.exports = eventTablePage;