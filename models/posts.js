const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '貼文姓名未填寫']
  },
  tags: [
    {
      type: String,
      required: [true, '貼文標籤 tags 未填寫']
    }
  ],
  type: {
    type: String,
    enum: ['group', 'person'], // - 可填的value為字串型態，只可填入'group', 'person'
    required: [true, '貼文類型 type 未填寫 只可填入group, person']
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
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: {
    type: Number,
    default: 0
  },
}, {
  versionKey: false
})

const Posts = mongoose.model('Post', postSchema)

module.exports = Posts