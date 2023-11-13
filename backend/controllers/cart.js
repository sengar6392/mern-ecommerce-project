const { Cart } = require("../models/cart");

exports.fetchCartByUser = async (req, res) => {
  const { user } = req.query; 
  try {
    const cartItems = await Cart.find({ user: user })
      .populate("user")
      .populate("product");
    res.status(200).json(cartItems);
  } catch (error) {
    console.log("Error in fetching cart by user", error);
    res.status(400).json(error);
  }
};

exports.addToCart = async (req, res) => {
  try {
    const doc = await Cart.create(req.body)
    const result=await doc.populate("product");
    res.status(201).json(result);
  } catch (error) {
    console.log("Error in adding to cart", error);
    res.status(400).json(error);
  }
};

exports.deleteCart = async (req, res) => {
    const { id } = req.params;
    try {
      const result=await Cart.findByIdAndDelete(id);
      res.status(200).json(result);
    } catch (err) {
      console.log("Error deleting the cart item", err);
      res.status(400).json(err);
    }
  };
exports.updateCart = async (req, res) => {
    const { id } = req.params;
    try {
      const cart=await Cart.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      const result=await cart.populate("product")
      res.status(200).json(result);
    } catch (err) {
      console.log("Error updating the cart", err);
      res.status(400).json(err);
    }
  };