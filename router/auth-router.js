const express = require("express");
const router = express.Router();
const {home,register,login} = require("../controller/auth-controller")
const { signupSchema, loginSchema } = require("../validator/auth-validator");
const validate = require("../middleware/validate");


router.route("/").get(home);
router.route("/register").post(validate(signupSchema),register);
router.route("/login").post(validate(loginSchema), login);

module.exports = router;