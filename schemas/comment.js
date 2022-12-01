const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const commentsSchema = new mongoose.Schema({
  commentContents: {
    type: String
  },
  commentPassword: {
    type: String,
    required: true
  },
  postId: {
    type: String
  },
  user: {
    type: String,
    required: true
  }
}
,{timestamps:true}
);

commentsSchema.plugin(AutoIncrement, {inc_field: 'commentId'});
module.exports = mongoose.model("comments", commentsSchema);