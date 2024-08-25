const mongoose = require("mongoose");
const { postModel } = require("../models/postModel");
const { verifyToken } = require("../utils/verifyToken");

/**
 * Retrieves all blog posts from the database.
 *
 * @returns {Promise<object[]>} -  array of blog posts.
 */
async function allBlogService() {
  try {
    const Blog = await postModel.find();
    if (!Blog) {
      throw new Error("Blog Not Found");
    }
    return Blog;
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * Retrieves a blog post by its ID from the database.
 *
 * @param {String} id - ID of the blog post
 * @returns {Promise<object>} -  the blog post object.
 */
async function blogByIdService(id) {
  try {
    const Blog = await postModel.findById(id);
    // console.log("Blog :", Blog);s

    if (!Blog) {
      throw new Error("Blog Not Found please Enter Valid BlogId");
    }
    return Blog;
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * Adds a new blog post to the database.
 *
 * @param {object} req -  request object containing the blog post details.
 * @returns {Promise<object>} -  the newly created blog post.
 */
async function AddNewBlogService(req) {
  try {
    // console.log(req.body);
    if (req.body.title == "" || req.body.content == "") {
      throw new Error("Please Fill the Fields! Fields Can't be Blank");
    }
    const newBlogPost = new postModel({
      ...req.body,
      author: req.body.id,
    });
    newBlogPost.save();
    return newBlogPost;
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * Updates an existing blog post in the database.
 *
 * @param {String} authorId - ID of the author
 * @param {object} body -  updated details of the blog post.
 * @param {String} id -  ID of the blog post to update.
 * @returns {Promise<object>} - the updated blog post.
 */
async function updateBlogService(authorId, body, id) {
  try {
    const blog = await postModel.findById(id);

    if (!blog) {
      throw new Error("Blog Not Found Please try again");
    }

    const blogfind = await postModel.findOne({_id:id, author: authorId });
    // console.log('blogfind :', blogfind);
    
    if (!blogfind) {
      throw new Error("Not A valid User Please Try Again");
    }
    const updatedBlog = await postModel.findByIdAndUpdate(
      id,
      { ...body },
      { new: true }
    );
    return updatedBlog;
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * Deletes a blog post from the database.
 *
 * @param {String} id -  ID of the blog post to delete.
 * @param {String} authorId - ID of the author requesting the deletion.
 * @returns {Promise<object>} - the deleted blog post.
 */
async function deleteBlogService(id, authorId) {
  try {
    const blog = await postModel.findById(id);

    if (!blog) {
      throw new Error("Blog Not Found Please try again");
    }

    const blogfind = await postModel.findOne({_id:id, author: authorId });
    if (!blogfind) {
      throw new Error("Not A valid User Please Try Again");
    }
    const deleteBlog = await postModel.findByIdAndDelete(id);
    return deleteBlog;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Exports all modules
module.exports = {
  allBlogService,
  blogByIdService,
  AddNewBlogService,
  updateBlogService,
  deleteBlogService,
};
