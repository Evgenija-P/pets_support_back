const express = require("express");
const router = express.Router();

const {ctrlWrapper} = require('../../helpers');
const { auth } = require('../../controllers')
const { authenticate, upload } = require('../../middlewares')


router.post("/signup", ctrlWrapper(auth.signUp));

router.post("/signin", ctrlWrapper(auth.signIn));

router.post("/logout", authenticate, ctrlWrapper(auth.logOut));

router.get("/current", authenticate, ctrlWrapper(auth.current));

router.post("/verify", ctrlWrapper(auth.reVerify));

router.get("/verify/:verificationToken", ctrlWrapper(auth.verify));

router.patch("/avatars", authenticate, upload.single('avatar'), ctrlWrapper(auth.avatar))




module.exports = router;
