
async function postDetailsPage(req, res) {
    try {
        res.render("fetch_posts/postDetailsPage");
    } catch (error) {
        console.log(error);
    }
}

module.exports = postDetailsPage;