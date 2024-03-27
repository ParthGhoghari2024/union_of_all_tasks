const { getLoginDataByUserEmail } = require("../helper/dbHelperLogin");

async function forgotPasswordPage(req, res) {
    try {
        var reqEmail = req.query.email;
        var reqToken = req.query.token;

        if(!reqEmail || !reqToken){
            res.json({error:1,err:"invalid email or token"})
        }

        var loginData = await getLoginDataByUserEmail(reqEmail);


        if(!loginData || loginData.length!=1 || loginData[0].activationStatus===0 ){
            res.json({error: 1});
            return;
        }
        if(loginData[0].activationToken!=reqToken){
            return res.json({error:1,err:"invalid email or token"});
        }
        
        //now req query is valid
        res.render("forgotPasswordPage")
    } catch (error) {
        console.log(error);
    }
}

module.exports = forgotPasswordPage;