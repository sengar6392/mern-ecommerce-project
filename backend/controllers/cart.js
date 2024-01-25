import Cart from "../models/cart.js"

export const fetchCartByUser = async (req, res) => {
  const id = req.user._id;
  try {
    const cartItems = await Cart.find({ user: id })
      .populate("product");
    res.status(200).json(cartItems);
  } catch (error) {
    console.log("Error in fetching cart by user", error);
    res.status(400).json(error);
  }
};

export const addToCart = async (req, res) => {
  const id =req.user._id
  try {
    const doc = await Cart.create({...req.body,user:id});
    const cartItems = await Cart.find({ user: id })
      .populate("product");
    res.status(200).json(cartItems);
  } catch (error) {
    console.log("Error in adding to cart", error);
    res.status(400).json(error);
  }
};

export const deleteCart = async (req, res) => {
  const { id } = req.query;
  try {
    const result = await Cart.findByIdAndDelete(id);
    res.status(200).json(result);
  } catch (err) {
    console.log("Error deleting the cart item", err);
    res.status(400).json(err);
  }
};
export const clearCartByUser = async (req, res) => {
  const id = req.user._id;
  try {
    const result = await Cart.deleteMany({user:id});
    res.status(200).json(result);
  } catch (err) {
    console.log("Error deleting the cart item", err);
    res.status(400).json(err);
  }
};
export const updateCart = async (req, res) => {
  const { id } = req.query;
  console.log(req.query);
  try {
    const cart = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const result = await cart.populate("product");
    res.status(200).json(result);
  } catch (err) {
    console.log("Error updating the cart", err);
    res.status(400).json(err);
  }
};
