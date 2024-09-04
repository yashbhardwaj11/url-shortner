const { getUser } = require("../service/auth");

async function restrictToLoggedInUserOnly(req, res, next) {
    const useruid = req.cookies?.uid;
    if (!useruid) {
        return res.redirect('/login?error=User+not+authenticated');
    }
    const user = await getUser(useruid); 

    if (!user) {
        return res.redirect('/login?error=User+not+authenticated');
    }

    console.log(user.user);
    
    req.user = user.user;
    next();

}

async function checkAuth(req,res,next){
    const useruid = req.cookies?.uid;

    const user = await getUser(useruid);

    req.user = user;
    next(); 
}

module.exports = {
    checkAuth,
    restrictToLoggedInUserOnly
};
