const { Int32 } = require('mongodb')
const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
  groceryItem: {
    type: String,
    required: true,
  },
  quantity: {
    type: Int32,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Todo', TodoSchema)
