import Product from "../models/product.js"

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ message: "Successfully created", data: product });
  } catch (error) {
    console.log("Error in creating a new product:", error);
    res.status(400).send({ message: "Failed to create product. " + error });
  }
};
export const fetchAllProducts = async (req, res) => {
  let condition = {};
  if (!req.query.admin) {
    condition.deleted = { $ne: true };
  }
  let query = Product.find(condition);
  let totalProductsQuery = Product.find(condition);

  if (req.query.category) {
    query = query.find({ category: { $in: req.query.category.split(",") } });
    totalProductsQuery = totalProductsQuery.find({
      category: { $in: req.query.category.split(",") },
    });
  }
  if (req.query.brand) {
    query = query.find({ brand: { $in: req.query.brand.split(",") } });
    totalProductsQuery = totalProductsQuery.find({
      brand: { $in: req.query.brand.split(",") },
    });
  }

  const totalProducts=await totalProductsQuery.count().exec()
  
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
    res.set("X-Total-Count",totalProducts)
    res.status(200).json(docs);
  } catch (error) {
    console.log("Error fetching all products: ", error);
    res.status(400).json({ message: "Fetch failed." + error });
  }
};

export const fetchProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    console.log("Error getting the product", err);
    res.status(400).json(err);
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ message: `Updated successfully`, product });
  } catch (err) {
    console.log("Error updating the product", err);
    res.status(400).json(err);
  }
};
