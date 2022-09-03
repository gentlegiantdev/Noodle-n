const { Int32 } = require('mongodb')
const mongoose = require('mongoose')
const groceryItems = require('../controllers/groceryItems')

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
  }},
  { collection : 'groceryItems'
})

module.exports = mongoose.model('GroceryItem', GroceryItemSchema)
