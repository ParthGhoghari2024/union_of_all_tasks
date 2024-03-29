const { getLoginDataByUserEmail, updatePasswordByEmail } = require("../../helper/dbHelperLogin");
var crypto = require('crypto');

async function newPassword(req, res) {
    try {
        // console.log(req.body);
        var userPassword = req.body.password;
        var confirmPassword = req.body.confirmPassword;
        var userEmail = req.body.email;
        var token = req.body.token;
        // console.log(token);
        var loginData = await getLoginDataByUserEmail(userEmail);
        var isActivated = loginData && loginData.length === 1 && loginData[0].activationStatus === 1;
        if (userPassword != confirmPassword) {
            res.json({ error: 1 });
            return;
        }

        if (isActivated === false) {
            res.json({ error: 1 });
            return;
        }
        if(token!==loginData[0].activationToken){
            res.json({ error: 1 });
            return;
        }
        var activationTimeLimitInHours = 4;
        var tokenValidate = (Math.abs(new Date() - new Date(loginData[0].tokenGenerationTime)) / (3600 * 1000)) <= activationTimeLimitInHours;
        if(tokenValidate===false){//forgot password token expired
           res.json({error: 1,errorMsg:"Token Expired"})
           return;
        }
        var passwordSalt = loginData[0].passwordSalt;
        var passwordHashed = crypto.createHash("md5").update(userPassword + passwordSalt).digest("hex");
        var updatePasswordResult = await updatePasswordByEmail([passwordHashed,userEmail])
      
        if(updatePasswordResult || updatePasswordResult.affectedRows===1){
            res.json({error : 0})
            return;
        }
        res.json({ error: 1 })
    } catch (error) {
        console.log(error);
    }
}

module.exports = { newPassword };