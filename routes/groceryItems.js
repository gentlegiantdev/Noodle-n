const express = require('express')
const router = express.Router()
const groceryItemsController = require('../controllers/groceryItems') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, groceryItemsController.getGroceryItems)

router.post('/createGroceryItem', groceryItemsController.createGroceryItem)

router.put('/markComplete', groceryItemsController.markComplete)

router.put('/markIncomplete', groceryItemsController.markIncomplete)

router.put('/increaseQuantity', groceryItemsController.increaseQuantity)

router.put('/decreaseQuantity', groceryItemsController.decreaseQuantity)

router.delete('/deleteGroceryItem', groceryItemsController.deleteGroceryItem)

module.exports = router