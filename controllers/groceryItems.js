const GroceryItem = require("../models/GroceryItem");

module.exports = {
  // 
  getGroceryItems: async (req, res) => {
    console.log(req.user);
    try {
      const groceryItemItems = await GroceryItem.find({ userId: req.user.id });
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
      const item = await GroceryItem.create({
        groceryItem: req.body.groceryItemItem,
        quantity: req.body.groceryItemNum,
        completed: false,
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
