const { userModel } = require("../models/usersModel");
const bcrypt = require("bcrypt");

/**
 * Registers a new user
 *  checks if the username or email already exists,
 * hashes the user's password, and saves the new user.
 *
 * @param {object} body -  user details including username, email, and password.
 * @returns {Promise<object>} -  newly created user object.
 */
async function userRegisterService(body) {
  try {
    const username = await userModel.findOne({ username: body.username });
    const useremail = await userModel.findOne({ email: body.email });

    if (username) {
      throw new Error("Username Already Exist try another Username");
    }
    if (useremail) {
      throw new Error("Email Already Exist try another Email");
    }

    const user1 = new userModel({
      ...body,
      created_at: Date.now(),
      password: await bcrypt.hash(body.password, 10),
    });

    user1.save();
    return user1;
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * Signs in a user by verifying their username and password.
 *  checks if the user exists and if the password matches,
 * returning the user if authentication is successful.
 *
 * @param {object} req -  object containing username and password.
 * @returns {Promise<object>} - user object if authentication is successful.
 */
async function SignInUserService(req) {
  try {
    const users = await userModel.findOne({ username: req.body.username });

    if (!users) {
      throw new Error("User Not Found");
    } else {
      if (await bcrypt.compare(req.body.password, users.password)) {
        return users;
      } else {
        throw new Error("Please Enter your Correct password");
      }
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

// Export All services
module.exports = {
  userRegisterService,
  SignInUserService,
};
