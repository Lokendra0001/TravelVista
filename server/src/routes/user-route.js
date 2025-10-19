const { Router } = require("express");
const router = Router();

const checkAuthentication = require("../middleware/auth");
const { handleUserSignUp, handleUserSignIn, handleGetCurrentUser } = require("../controller/user-controller");


router.post('/', handleUserSignUp)

router.get('/', handleUserSignIn);

router.get("/me", checkAuthentication, handleGetCurrentUser)





module.exports = router;