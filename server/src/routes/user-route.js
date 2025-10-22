const { Router } = require("express");
const router = Router();

const checkAuthentication = require("../middleware/auth");
const { handleUserSignUp, handleUserSignIn, handleGetCurrentUser } = require("../controller/user-controller");
const userModel = require("../model/user-model");
const upload = require("../libs/cloudinaryConfig");


router.post('/signup', handleUserSignUp)

router.post('/update', checkAuthentication, upload.single("profilePic"), async (req, res) => {
    try {
        const { _id } = req.user;
        const { fullName, email } = req.body;
        console.log(req.file)
        const updatedUser = await userModel.findByIdAndUpdate(_id, { fullName, email, profilePic: req?.file?.path }, { new: true }).select('-password');
        return res.status(200).json({ msg: "User Updated Successfully!", user: updatedUser });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: `Internal Server Error : ${err.message}` })
    }
})

router.post('/signin', handleUserSignIn);

router.get("/me", checkAuthentication, handleGetCurrentUser)

router.get("/logout", checkAuthentication, async (req, res) => {
    try {
        res.clearCookie("tv_authToken");
        return res.status(200).json({ msg: "User LogOut Successfully!" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: `Internal Server Error : ${err.message}` })
    }
})


module.exports = router;