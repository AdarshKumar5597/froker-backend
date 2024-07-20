const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  imguri: {
    type: String,
    required: true,
  },
  createdby: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
