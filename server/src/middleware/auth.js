const { handleCheckTokenAndVerifyUser } = require("../libs/auth");

const handleCheckAuthentication = (req, res, next) => {
    try {
        req.user = null;
        const token = req.cookies?.tv_authToken;
        if (!token) return res.status(404).json({ msg: "Please Login First!" });

        const user = handleCheckTokenAndVerifyUser(token);

        if (!user) return res.status(400).json({ msg: "Please Login First!" });

        req.user = user;
        next();
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: `Internal Server Error : ${err.message}` });
    }
}

module.exports = handleCheckAuthentication