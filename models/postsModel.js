const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: [true, 'user ID 未填寫']
  },
  image: {
    type: String,
    default: ""
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  content: {
    type: String,
    required: [true, 'Content 未填寫'],
  }

}, {
  versionKey: false
})

const Posts = mongoose.model('Post', postSchema)

module.exports = Posts