const { Router } = require("express");
const router = Router();

const checkAuthentication = require("../middleware/auth");
const { handleUserSignUp, handleUserSignIn, handleGetCurrentUser, handleLogoutUser, handleUpdateUser } = require("../controller/user-controller");
const upload = require("../libs/cloudinaryConfig");


router.post('/signup', handleUserSignUp)

router.post('/update', checkAuthentication, upload.single("profilePic"), handleUpdateUser)

router.post('/signin', handleUserSignIn);

router.get("/me", checkAuthentication, handleGetCurrentUser)

router.get("/logout", checkAuthentication, handleLogoutUser)


module.exports = router;