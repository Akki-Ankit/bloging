const userService = require("../services/userService");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/envconfig");

/**
 * Controller function for registering a new user.
 * It calls the userRegisterService and sends the response.
 *
 * @param {object} req -  request object
 * @param {object} res -  response object
 */
async function userRegisterController(req, res) {
  try {
    // Call the service function to register a new user
    const userRegisterServiceResponse = await userService.userRegisterService(
      req.body
    );

    // Send a success response with the registered user details
    res.status(201).send({
      success: true,
      User: userRegisterServiceResponse,
      message: "User Registered Successfully",
    });
  } catch (error) {
    // Send an error response if registration fails
    res.status(400).send({
      success: false,
      error: error.message,
      message: "Registration Failed. Please try again.",
    });
  }
}

/**
 * Controller function for signing in a user.
 * It calls the SignInUserService, generates a JWT token, and sends the response.
 *
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
async function userSignInController(req, res) {
  try {
    // Call the service function to sign in a user
    const signInUserServiceResponse = await userService.SignInUserService(req);

    // Check if sign-in was successful and user data is returned
    if (!signInUserServiceResponse) {
      return res.status(401).send({
        success: false,
        message: "Invalid credentials. Please try again.",
      });
    }

    const id = signInUserServiceResponse.id;
    // Generate a JWT token with the user ID and a 2-hour expiration time
    const token = jwt.sign({ id }, SECRET, { expiresIn: "2h" });

    // Send a success response with the user's username and JWT token
    res.status(200).send({
      success: true,
      User: signInUserServiceResponse.username,
      Access_token: token,
      message: "User Signed in Successfully",
    });
  } catch (error) {
    // Send an error response if sign-in fails
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Sign-In Failed. Please try again.",
    });
  }
}

// Export all controller functions for use in routing
module.exports = {
  userRegisterController,
  userSignInController,
};
