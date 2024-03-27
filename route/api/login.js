const { getLoginDataByUserEmail } = require("../../helper/dbHelperLogin");
var crypto = require('crypto');

const jwt = require("jsonwebtoken");
async function login(req, res) {
    try {
        //note: incomplete
        var userEmail = req.body.email;
        var userPassword = req.body.password;
        if (!userEmail || !userPassword) {
            res.json({ result: false, error: "Submit all required details" });
            return;
        }
        var loginData = await getLoginDataByUserEmail(userEmail);
        var isActivated = loginData && loginData.length === 1 && loginData[0].activationStatus === 1;
        if (isActivated === false) {
            res.json({ result: false });
            return;
        }

        var passwordSalt = loginData[0].passwordSalt;
        var inputPasswordHashed = crypto.createHash("md5").update(userPassword + passwordSalt).digest("hex");
        var passwordCheck = inputPasswordHashed === loginData[0].password;

        var jwtToken = jwt.sign({ userEmail }, process.env.TOKEN_SECRET, {
            expiresIn: "1d",
        })

        res.cookie("token", jwtToken, {
            httpOnly: true, // The cookie only accessible by the web server
            maxAge: 1000 * 60 * 60 * 24 ,
            sameSite:true
        });
        res.json({ result: passwordCheck, token: jwtToken })
    } catch (error) {
        console.log(error);
    }
}

module.exports = { login };