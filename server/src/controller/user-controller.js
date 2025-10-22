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
        const { password: _, ...userWithoutPwd } = createdUser.toObject();
        handleGetAndSendCookie(createdUser, res);

        return res.status(201).json({ msg: "User Signup Successfully!", user: userWithoutPwd });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: err.msg })
    }
}
const handleUserSignIn = async (req, res) => {
    const { email, password, role } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: "User not found!" });

    const verified = await user.verifyPwd(password);
    if (!verified) return res.status(400).json({ msg: "Wrong password!" });

    // 🔒 Enforce role correctly
    if (role && user.role !== role) {
        return res.status(403).json({
            msg: `You are not authorized to log in as ${user.role}.`,
        });
    }

    handleGetAndSendCookie(user, res);
    return res.status(200).json({ msg: `Signin successful as ${role}!`, user });
};



const handleGetCurrentUser = async (req, res) => {
    try {
        const { email } = req.user;

        const user = await User.findOne({ email }).select('-password ');
        return res.status(200).json({ msg: `Welcome Back ${user.fullName}`, user });

    } catch (err) {
        return res.status(500).json({ msg: err.msg })
    }
};

const handleUpdateUser = async (req, res) => {
    try {
        const { _id } = req.user;
        const { fullName, email } = req.body;
        console.log(req.file)
        const updatedUser = await User.findByIdAndUpdate(_id, { fullName, email, profilePic: req?.file?.path }, { new: true }).select('-password');
        return res.status(200).json({ msg: "User Updated Successfully!", user: updatedUser });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: `Internal Server Error : ${err.message}` })
    }
}

const handleLogoutUser = async (req, res) => {
    try {
        res.clearCookie("tv_authToken");
        return res.status(200).json({ msg: "User LogOut Successfully!" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: `Internal Server Error : ${err.message}` })
    }
}

module.exports = {
    handleGetCurrentUser, handleUserSignIn, handleUserSignUp,
    handleUpdateUser, handleLogoutUser
}