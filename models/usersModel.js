const mongoose = require("mongoose");

// Define the schema for the 'users' collection
const userschema = new mongoose.Schema({
  username: { type: String, required: true },

  email: { type: String, required: true, unique: true },

  password: { type: String, required: true },

  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Create the model for 'users' using the defined schema
const userModel = mongoose.model("users", userschema);

// Export the user model for use in other parts of the application
module.exports = {
  userModel,
};
