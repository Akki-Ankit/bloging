const express = require("express");
const { body, validationResult } = require("express-validator");

const app = express();
app.use(express.json());

async function emailcheck(req, res, next) {
  await body("email")
    .isEmail()
    .withMessage(
      "Email is not in the correct format, please write your correct email"
    )
    .run(req);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: errors.array()[0].msg,
      message: "Invalid Email. Try Again.",
    });
  }

  next();
}

module.exports = {
  emailcheck,
};
