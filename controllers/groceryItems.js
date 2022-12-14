const GroceryItem = require("../models/GroceryItem");

module.exports = {
  // 
  getGroceryItems: async (req, res) => {
    console.log(req.user);
    try {
      const groceryItemItems = await GroceryItem.find({ userId: req.user.id }).collation({locale:'en',strength: 2}).sort({storeSection:1});
      const itemsLeft = await GroceryItem.countDocuments({
        userId: req.user.id,
        completed: false,
      });
      res.render("groceryItems.ejs", {
        groceryItems: groceryItemItems,
        left: itemsLeft,
        user: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createGroceryItem: async (req, res) => {
    try {
      //format the input value to covert text to title case and remove whitespace from both ends 
      req.body.groceryItemItem = req.body.groceryItemItem.charAt(0).toUpperCase() + req.body.groceryItemItem.substr(1).toLowerCase();
      req.body.groceryItemItem = req.body.groceryItemItem.trim()

      //do same thing to storeSection 
      req.body.storeSection = req.body.storeSection.charAt(0).toUpperCase() + req.body.storeSection.substr(1).toLowerCase();
      req.body.storeSection = req.body.storeSection.trim()
      

      //check for duplicate entry before creating a grocery list item
      const duplicateVal = await GroceryItem.countDocuments({userId:req.user.id, groceryItem: req.body.groceryItemItem})
      
      //duplicate found
      if(duplicateVal){
        console.log(`Duplicate item: ${req.body.groceryItemItem}. Creation cancelled. Redirecting.`)
        req.flash('errors',{ msg: `${req.body.groceryItemItem} is already in your list` }) //flashes error if a duplicate entry is made
        return res.redirect('/groceryItems') //returns to the user list page
      }

      //duplicate not found
      const item = await GroceryItem.create({
        groceryItem: req.body.groceryItemItem,
        quantity: req.body.groceryItemNum,
        completed: false,
        storeSection: req.body.storeSection,
        userId: req.user.id,
      });
      console.log("GroceryItem has been added!");
      res.redirect("/groceryItems");
      console.log(item);
    } catch (err) {
      console.log(err);
    }
  },
  markComplete: async (req, res) => {
    try {
      await GroceryItem.findOneAndUpdate(
        { _id: req.body.groceryItemIdFromJSFile },
        {
          completed: true,
        }
      );
      console.log("Marked Complete");
      res.json("Marked Complete");
    } catch (err) {
      console.log(err);
    }
  },
  markIncomplete: async (req, res) => {
    try {
      await GroceryItem.findOneAndUpdate(
        { _id: req.body.groceryItemIdFromJSFile },
        {
          completed: false,
        }
      );
      console.log("Marked Incomplete");
      res.json("Marked Incomplete");
    } catch (err) {
      console.log(err);
    }
  },
  increaseQuantity: async (req, res) => {
    try {
      await GroceryItem.updateOne(
        { _id: req.body.groceryItemIdFromJSFile },
        {
          // increments value
          $inc: { quantity: +1 },
        }
      );
      console.log("Increased Quantity");
      res.json("Increased Quantity");
    } catch (err) {
      console.log(err);
    }
  },
  decreaseQuantity: async (req, res) => {
    try {
      await GroceryItem.updateOne(
        { _id: req.body.groceryItemIdFromJSFile, quantity: { $gt: 1 } },
        {
          // decrements values >= 1
          $inc: { quantity: -1 },
          message: "Decreased Quantity",
        }
      );
      console.log("Decreased Quantity");
      res.json("Decreased Quantity");
    } catch (err) {
      console.log(err);
    }
  },
  deleteGroceryItem: async (req, res) => {
    console.log(req.body.groceryItemIdFromJSFile);
    try {
      await GroceryItem.findOneAndDelete({
        _id: req.body.groceryItemIdFromJSFile,
      });
      console.log("Deleted GroceryItem");
      res.json("Deleted It");
    } catch (err) {
      console.log(err);
    }
  },
};
