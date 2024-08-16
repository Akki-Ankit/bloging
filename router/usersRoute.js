const express = require("express");
const router = express.Router();
const usercontroller = require("../controller/usercontroller");
const verifyemail = require("../utils/verifyemail");

/**
 * User Routes
 * Defines routes for user registration and sign-in
 */
router.post(
  "/UserRegister",
  verifyemail.emailcheck,
  usercontroller.userRegisterController
);
router.post("/UserSignin", usercontroller.userSignInController);
module.exports = {
  userRouter: router,
};
