const jwt = require("jsonwebtoken");

const jwt_secret = process.env.JWT_SECRET;

const handleGetAndSendCookie = (user, res) => {
    const userPayload = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
    }
    const token = jwt.sign(userPayload, jwt_secret);

    res.clearCookie("tv_authToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    res.cookie("tv_authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // true in prod, false in dev
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });


}

const handleCheckTokenAndVerifyUser = (token) => {
    return jwt.verify(token, jwt_secret);
}

module.exports = {
    handleGetAndSendCookie,
    handleCheckTokenAndVerifyUser
}