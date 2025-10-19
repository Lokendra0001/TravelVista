const User = require("../model/user-model");
const { handleGetAndSendCookie } = require("../libs/auth");

const handleUserSignUp = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        const isAlreadyUser = await User.findOne({ email });

        if (isAlreadyUser) {
            return res.status(400).json({ msg: "User Already There. Please Login!" });
        }

        const createdUser = await User.create({ fullName, email, password });
        handleGetAndSendCookie(createdUser, res);

        return res.status(201).json({ msg: "User Signup Successfully!", createdUser });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: err.msg })
    }
}

const handleUserSignIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const isUser = await User.findOne({ email });

        if (!isUser) return res.status(400).json({ msg: "User Not Found!" });

        const verifiedPwd = await isUser.verifyPwd(password);
        console.log(verifiedPwd)

        if (!verifiedPwd) return res.status(400).json({ msg: "Wrong Password. Try Another One!" });

        handleGetAndSendCookie(isUser, res);
        return res.status(200).json({ msg: "User Login Successfully!" });

    } catch (err) {
        return res.status(500).json({ msg: err.msg })
    }
}

const handleGetCurrentUser = async (req, res) => {
    try {
        const { email } = req.user;

        const user = await User.findOne({ email });
        return res.status(200).json({ msg: `Welcome Back ${user.fullName}` });

    } catch (err) {
        return res.status(500).json({ msg: err.msg })
    }
};

module.exports = {
    handleGetCurrentUser, handleUserSignIn, handleUserSignUp
}