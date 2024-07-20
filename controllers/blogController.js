const Blog = require("../models/blogModel");

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: "Server Error in getBlogs",
    });
  }
};

exports.getBlogsByIndex = async (req, res) => {
  try {

    const startIndex = parseInt(req.query.startIndex);
    const endIndex = parseInt(req.query.endIndex);

    console.log("startIndex:", startIndex);
    console.log("endIndex:", endIndex);

    if (startIndex < 0 || endIndex < 0) {
      return res.status(400).json({ success: false, message: "Invalid index" });
    }

    if (startIndex === undefined || endIndex === undefined) {
        return res.status(400).json({ success: false, message: "Missing index" });
    }

    const blogs = await Blog.find()
      .skip(startIndex)
      .limit(endIndex - startIndex);

    res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: "Server Error in getBlogsByIndex",
    });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: "Server Error in getBlogById",
    });
  }
};

exports.addLikesOfBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    blog.likes += 1;
    await blog.save();
    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: "Server Error in updateLikesOfBlogById",
    });
  }
};

exports.deleteLikesOfBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    if (blog.likes === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Blog has no likes" });
    }

    blog.likes -= 1;
    await blog.save();
    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: "Server Error in deleteLikesOfBlogById",
    });
  }
};

exports.getFirstThreePopularBlogs = async (req, res) => {
  try {
    console.log("Fetching top 3 blogs sorted by likes...");
    let blogs = await Blog.find({}).sort({ likes: -1 });
    if (blogs.length > 3) {
      blogs = blogs.slice(0, 3);
    }
    console.log("Fetched blogs:", blogs);
    res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: "Server Error in getFirstThreePopularBlogs",
    });
  }
};

exports.addBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json({
      success: true,
      blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: "Server Error in addBlog",
    });
  }
};
