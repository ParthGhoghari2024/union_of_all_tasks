const { getLoginDataByUserId, insertLoginData, getLoginDataByUserEmail } = require("../../helper/dbHelperLogin");
const generateUniqueId = require('generate-unique-id');
var crypto = require('crypto');
async function register(req,res) {
    try {
        var registerDetails = {
            firstName : req.body.firstname,
            lastName  : req.body.lastname ,
            email : req.body.email,
            password : req.body.password,
            confirmPassword : req.body.confirmPassword
        }
        var basicValidate = !registerDetails || !registerDetails.firstName || !registerDetails.lastName || !registerDetails.email || !registerDetails.password || !registerDetails.confirmPassword;
        if(basicValidate){
            res.json({registered :0,error:"Submit all required details"})
            return;
        }
        if(registerDetails.password!==registerDetails.confirmPassword){
            res.json({registered :0,error:"Password and Confirm Password Not Matched"})
            return;
        }
        var userDataByEmail = await getLoginDataByUserEmail(registerDetails.email);
        // console.log(userDataByEmail);

        // if(userDataByEmail.length===1 &&  userDataByEmail[0].activationStatus===0){
        //     //this means email is registred but not activated and user is trying to re-register ir
        //     res.json({registered :0,error:"email already registered , activate it using activation link"});
        //     return;
        // }
        if(userDataByEmail.length!=0){
            res.json({registered :0,error:"email already taken"});
            return;
        }
        var passwordSalt = generateUniqueId({length:4});
        var passwordHashed = crypto.createHash("md5").update(registerDetails.password + passwordSalt).digest("hex");

        // console.log(passwordSalt);

        var activationToken=generateUniqueId({length:12});
        var activationStatus = 0;
        var loginDataArr = [registerDetails.firstName,registerDetails.lastName,registerDetails.email,passwordHashed,passwordSalt,activationToken,activationStatus] 
        // console.log(loginDataArr);
        var insertLoginDataResult = await insertLoginData(loginDataArr);
        res.json({registered :1,activationToken,email:registerDetails.email});
    } catch (error) {
        console.log(error);
    }
}

module.exports = { register };