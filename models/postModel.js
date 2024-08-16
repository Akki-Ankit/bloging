const mongoose = require("mongoose");
const users = require("./usersModel");
// Define the schema for the 'posts' collection
const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    content: { type: String, required: true },

    author: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  },
  { timestamps: true } //  manage 'createdAt' and 'updatedAt' fields
);

// Create the model for 'posts' using the defined schema
const postModel = mongoose.model("posts", postSchema);

// Export the post model for use in other parts of application
module.exports = {
  postModel,
};
