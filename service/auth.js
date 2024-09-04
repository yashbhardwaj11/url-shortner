const jwt = require("jsonwebtoken");
const secret = "Yash$1243%6969";

function setUser(user) {
    const tokenPayload = { user};
    return jwt.sign(tokenPayload, secret);
}

function getUser(token) {
     try {
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (err) {
        console.error("JWT verification failed:", err);
        return null;
    }
}

module.exports = {
    setUser,
    getUser
};
