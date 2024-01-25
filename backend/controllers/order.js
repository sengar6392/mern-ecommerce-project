import Cart from "../models/cart.js"
import Order from "../models/order.js"

export const fetchOrderByUser = async (req, res) => {
  const userId  = req.user._id; 
  try {
    const orders = await Order.find({ user: userId })
    res.status(200).json(orders);
  } catch (error) {
    console.log("Error in fetching orders by user", error);
    res.status(400).json(error);
  }
};

export const createOrder = async (req, res) => {
  const id=req.user._id
  try {
    const doc = await Order.create({...req.body,user:id})
    res.status(201).json(doc);
  } catch (error) {
    console.log("Error in creating order", error);
    res.status(400).json(error);
  }
};

export const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
      await Order.findByIdAndDelete(id);
      res.status(200).json({ message: `deleted successfully`});
    } catch (err) {
      console.log("Error deleting the order", err);
      res.status(400).json(err);
    }
  };
export const updateOrder = async (req, res) => {
    const { id } = req.params;
    try {
      const order=await Cart.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json({ message: `Updated successfully`,order });
    } catch (err) {
      console.log("Error updating the order", err);
      res.status(400).json(err);
    }
  };

  export const fetchAllOrders = async (req, res) => {
    let query = Order.find({deleted:{$ne:true}});

    if (req.query._page && req.query._limit) {
      const pageSize = req.query._limit;
      const page = req.query._page;
      query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }
    if (req.query._sort && req.query._order) {
      query = query.sort({ [req.query._sort]: req.query._order });
    }
    try {
      const docs = await query.exec();
      // const count = docs.length;
      // console.log("count",count)
      // res.set("X-Total-Count",count)
      res.status(200).json({ message: "success", data: docs });
    } catch (error) {
      console.log("Error fetching all products: ", error);
      res.status(400).json({ message: "Fetch failed." + error });
    }
  };