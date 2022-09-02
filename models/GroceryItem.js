const { Int32 } = require('mongodb')
const mongoose = require('mongoose')

const GroceryItemSchema = new mongoose.Schema({
  groceryItem: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
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

module.exports = mongoose.model('GroceryItem', GroceryItemSchema)
