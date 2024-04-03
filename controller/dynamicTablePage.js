
async function dynamicTablePage(req, res) {
	try {
		res.render("dynamictable/")
	} catch (error) {
		console.log(error);
	}
}

module.exports = dynamicTablePage;