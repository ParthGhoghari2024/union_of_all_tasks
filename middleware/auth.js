const jwt = require("jsonwebtoken");

async function authorizationMiddleware(req,res,next) {
    try {
        var reqToken = req.cookies.token;
        if(!reqToken){
            // return res.json({auth : false});
            return res.status(401).json({
                auth : false,
                error : "invalid token try login again"
            });
        }
        try {
            var jwtVerify = jwt.verify(reqToken,process.env.TOKEN_SECRET);
            next();
        } catch (error) {
            // return res.json({auth : false});

            return res.status(401).json({
                auth : false,
                error : "invalid token try login again"
            });
        }
    } catch (error) {
        console.log(error);
    }

}

module.exports = {authorizationMiddleware};