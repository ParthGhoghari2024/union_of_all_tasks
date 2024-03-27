
async function loginPage(req, res) {
    try {
        res.render("loginPage")
    } catch (error) {
        console.log(error);
    }
}

module.exports = loginPage;