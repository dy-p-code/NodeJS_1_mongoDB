const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);
// mongoose sequence (숫자 자동 증가)

const postsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  contents: {
    type: String,
    required: true
  }
}
,{timestamps:true}
);

postsSchema.plugin(AutoIncrement, {inc_field: 'postId'});
// mongoose sequence (숫자 자동 증가)
module.exports = mongoose.model("posts", postsSchema);