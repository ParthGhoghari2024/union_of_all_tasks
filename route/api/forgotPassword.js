const {  getLoginDataByUserEmail, updateActivationToken } = require("../../helper/dbHelperLogin");
var crypto = require('crypto');
const generateUniqueId = require('generate-unique-id');

async function forgorPassword(req,res) {
    try {
        var userEmail = req.body.email;
        var loginData = await getLoginDataByUserEmail(userEmail);
        if(!loginData || loginData.length!=1 || loginData[0].activationStatus===0){
            res.json({error: 1});
            return;
        }
        var activationToken=generateUniqueId({length:12});
        var updateActivationTokenArr = [activationToken,new Date(),userEmail]
        var updateActivationTokenResult = await updateActivationToken(updateActivationTokenArr); 
        // console.log(updateActivationTokenResult);
        if(!updateActivationTokenResult && updateActivationTokenResult.affectedRows!=1){
            res.json({error :1});
            return;
        }
        
        var forgotPasswordLink = `http://localhost:3000/forgotpassword?email=${loginData[0].email}&token=${activationToken}`
        res.json({error:0,forgotPasswordLink : forgotPasswordLink});
    } catch (error) {
        console.log(error);
    }
}

module.exports = {forgorPassword};