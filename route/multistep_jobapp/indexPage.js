
async function homePage(req, res) {
    try {
        res.render("multistep_jobapp/index")
    } catch (error) {
        console.log(error);
    }
}

module.exports = homePage;