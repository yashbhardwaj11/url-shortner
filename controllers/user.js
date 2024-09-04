const User = require("../models/user");
const {v4 : uuidv4} = require("uuid");
const {setUser,getUser} = require("../service/auth")

async function handleUserSignUp(req, res) {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).render("signup", {
                error: "Email already in use. Please try a different email.",
            });
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        return res.status(200).redirect('/');

    } catch (error) {
        console.error("Error during user signup:", error);
        return res.status(500).render("signup", {
            error: "An unexpected error occurred. Please try again later.",
        });
    }
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email, password });

        if (!existingUser) {
            return res.status(400).render("Login", {
                error: "Invalid username or password",
            });
        }

        const uid = setUser(existingUser);
        res.cookie('uid',uid);


        return res.redirect('/');

    } catch (error) {
        console.error("Error during user signup:", error);
        return res.status(500).render("signup", {
            error: "An unexpected error occurred. Please try again later.",
        });
    }
}

module.exports = {
    handleUserSignUp,handleUserLogin
};
