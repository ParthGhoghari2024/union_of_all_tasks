
async function registerPage(req, res) {
    try {
        res.render("registerPage")
    } catch (error) {
        console.log(error);
    }
}

module.exports = registerPage;