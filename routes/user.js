const express = require("express");
const router = express.Router();
const {handleUserSignUp,handleUserLogin} = require("../controllers/user");
const { getUser } = require("../service/auth");

async function userLoggedIn(req, res, next) {
    const token = req.cookies?.uid;
    if (!token) {
        return next();
    }

    try {
        const user = getUser(token);
        if (user) {
            return res.redirect('/');
        }
    } catch (error) {
        console.error("Error verifying token:", error);
        return next();
    }

    next();
}


router.post("/",userLoggedIn,handleUserSignUp);
router.post("/login",userLoggedIn,handleUserLogin);

module.exports = router;