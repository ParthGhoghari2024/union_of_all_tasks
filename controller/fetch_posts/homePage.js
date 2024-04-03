
async function homePage(req, res) {
	try {
		res.redirect("/fetch-posts/posts")
	} catch (error) {
		console.log(error);
	}
}

module.exports = homePage;