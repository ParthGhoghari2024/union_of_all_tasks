
async function postDetailsHomePage(req, res) {
	try {
		res.redirect("/fetch-posts/posts-details/1");
	} catch (error) {
		console.log(error);
	}
}

module.exports = postDetailsHomePage;