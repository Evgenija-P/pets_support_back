const express = require("express");
const router = express.Router();

const {ctrlWrapper} = require('../../helpers');
const { auth } = require('../../controllers')
const { authenticate, upload, validation } = require('../../middlewares')
const { signIn, signUp, updateUserSchema } = require('../../schemas')


router.post("/signup", validation(signUp), ctrlWrapper(auth.signUp));

router.post("/signin", validation(signIn), ctrlWrapper(auth.signIn));

router.post("/logout", authenticate, ctrlWrapper(auth.logOut));

router.get("/current", authenticate, ctrlWrapper(auth.current));

router.patch("/current", validation(updateUserSchema), authenticate, ctrlWrapper(auth.updateUser))

router.post("/verify", ctrlWrapper(auth.resendVerificationEmail));

router.get("/verify/:verificationToken", ctrlWrapper(auth.verify));

router.patch("/avatars", authenticate, upload.single('avatar'), ctrlWrapper(auth.avatar))




module.exports = router;
