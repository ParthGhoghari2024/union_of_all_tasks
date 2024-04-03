
async function postPage(req, res) {
	try {
		res.render("fetch_posts/postPage");
	} catch (error) {
		console.log(error);
	}
}

module.exports = postPage;