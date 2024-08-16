const express = require("express");
const router = express.Router();
const blogController = require("../controller/blogController");
const { verifyToken } = require("../utils/verifyToken");

/**
 * Blog Routes
 * Defines routes for managing blog posts
 */

router.get("/allBlog", blogController.allBlogController);
router.get("/:blogId", blogController.blogByIdController);
router.post("/newBlogPost", verifyToken, blogController.addNewBlogController);
router.put(
  "/updateBlog/:blogId",
  verifyToken,
  blogController.updateBlogController
);
router.delete(
  "/deleteBlog/:blogId",
  verifyToken,
  blogController.deleteBlogntroller
);

module.exports = {
  postrouter: router,
};
