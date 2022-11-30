const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  commentId: {
    type: Number,
    required: true,
    unique: true
  },
  commentContents: {
    type: String,
    required: true
  },
  commentDate: {
    type: Number,
    required: true
  },
  commentPassword: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("comments", commentsSchema);