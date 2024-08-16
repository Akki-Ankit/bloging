const express = require("express");
const services = require("../services/blogService"); // Import blog service functions

/**
 * Controller function for retrieving all blogs.
 * It calls the allBlogService and sends the response.
 *
 * @param {object} req - request object
 * @param {object} res - response object
 */
async function allBlogController(req, res) {
  try {
    // Call the service function to get all blogs
    const allBlogServiceResponse = await services.allBlogService();

    // Send a success response with the blogs
    res.status(200).send({
      success: true,
      status:200,
      message: "Blog List Found",
      Data: allBlogServiceResponse,
    });
  } catch (error) {
    // Send an error response if the service call fails
    res.status(500).send({
      success: false,
      status:500,
      message: "Blog List Not Found. Please try again.",
      error: error.message,
    });
  }
}

/**
 * Controller function for retrieving a blog by its ID.
 * It calls the blogByIdService and sends the response.
 *
 * @param {object} req - request object
 * @param {object} res - response object
 */
async function blogByIdController(req, res) {
  try {
    // Call the service function to get a blog by its ID
    const blogByIdServiceResponse = await services.blogByIdService(
      req.params.blogId
    );

    if (!blogByIdServiceResponse) {
      // If the blog is not found
      return res.status(404).send({
        success: false,
        status:404,
        message: "Blog Not Found",
      });
    }

    // Send a success response with the blog
    res.status(200).send({
      success: true,
      status:200,
      message: "Blog Found",
      Data: blogByIdServiceResponse,
    });
  } catch (error) {
    // Send an error response if the service call fails
    res.status(500).send({
      success: false,
      status:200,
      message: "An error occurred while retrieving the blog. Please try again.",
      error: error.message,
    });
  }
}

/**
 * Controller function for adding a new blog.
 * It calls the AddNewBlogService and sends the response.
 *
 * @param {object} req - request object
 * @param {object} res - response object
 */
async function addNewBlogController(req, res) {
  try {
    // Call the service function to add a new blog
    const AddNewBlogServiceResponse = await services.AddNewBlogService(req);

    // Send a success response with the added blog details
    res.status(201).send({
      success: true,
      status:201,
      message: "New Blog Added Successfully",
      Data: AddNewBlogServiceResponse,
    });
  } catch (error) {
    // Send an error response if the service call fails
    res.status(500).send({
      success: false,
      status:500,
      message: "New Blog Not Added. Please try again.",
      error: error.message,
    });
  }
}

/**
 * Controller function for updating an existing blog.
 * It calls the updateBlogService and sends the response.
 *
 * @param {object} req - request object
 * @param {object} res - response object
 */
async function updateBlogController(req, res) {
  try {
    // Call the service function to update a blog
    const updateBlogServiceResponse = await services.updateBlogService(
      req.body.id,
      req.body,
      req.params.blogId
    );

    if (!updateBlogServiceResponse) {
      // If the blog is not found, send a 404 Not Found response
      return res.status(404).send({
        success: false,
        status:404,
        message: "Blog Not Found",
      });
    }

    // Send a success response with the updated blog details
    res.status(200).send({
      success: true,
      status:200,
      message: "Blog Updated Successfully",
      Data: updateBlogServiceResponse,
    });
  } catch (error) {
    // Send an error response if the service call fails
    res.status(500).send({
      success: false,
      status:500,
      message: "Blog Not Updated. Please try again.",
      error: error.message,
    });
  }
}

/**
 * Controller function for deleting a blog.
 * It calls the deleteBlogService and sends the response.
 *
 * @param {object} req - request object
 * @param {object} res - response object
 */
async function deleteBlogntroller(req, res) {
  try {
    // Call the service function to delete a blog
    const deleteBlogServiceResponse = await services.deleteBlogService(
      req.params.blogId,
      req.body.id
    );

    if (!deleteBlogServiceResponse) {
      // If the blog is not found, send a 404 Not Found response
      return res.status(404).send({
        success: false,
        status:404,
        message: "Blog Not Found",
      });
    }

    // Send a success response with the title of the deleted blog
    res.status(200).send({
      success: true,
      status:200,
      message: "Blog Deleted Successfully",
      title: deleteBlogServiceResponse.title,
    });
  } catch (error) {
    // Send an error response if the service call fails
    res.status(500).send({
      success: false,
      status:500,
      message: "Blog Not Deleted. Please try again.",
      error: error.message,
    });
  }
}

// Export all controller functions for use in routing
module.exports = {
  allBlogController,
  blogByIdController,
  addNewBlogController,
  updateBlogController,
  deleteBlogntroller,
};
