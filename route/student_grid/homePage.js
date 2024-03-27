const fs = require("fs");

function homePage(req,res) {
    try {
        res.render("student_grid/home");
    } catch (error) {   
        console.log(error);
    }
}

module.exports = homePage;