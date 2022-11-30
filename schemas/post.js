const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  postId: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  postsDate: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  contents: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("posts", postsSchema);