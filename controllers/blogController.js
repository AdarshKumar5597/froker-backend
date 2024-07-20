const Blog = require("../models/blogModel");

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
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

exports.addManyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.insertMany(req.body);
    res.status(201).json({
      success: true,
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: "Server Error in addManyBlogs",
    });
  }
}

exports.getPopularPosts = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ likes: -1 });
    res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: "Server Error in getPopularPosts",
    });
  }
}