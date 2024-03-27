const jwt = require("jsonwebtoken");

async function checkAuth(req,res) {
    try {
        res.json({auth:true});
    } catch (error) {
        console.log(error);
    }
}

module.exports = {checkAuth};