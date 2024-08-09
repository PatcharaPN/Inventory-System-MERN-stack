const Product = require("../models/productModel");

const getProduct = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("createdBy")
      .populate("category");
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deleteproducts = await Product.findByIdAndDelete(productId).exec();
    if (!deleteproducts) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(deleteproducts);
  } catch (error) {
    res.status(500).json({
      message: "Error when deleting products",
    });
  }
};
const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      stock,
      available,
      reserved,
      location,
      createdBy,
      category,
    } = req.body;
    const productImage = req.file.path.replace("public/", "");
    if (!createdBy) {
      res.status(500).json({
        message: "User id is required",
      });
    }
    const newProduct = new Product({
      name,
      price,
      stock,
      available,
      location,
      reserved,
      category,
      createdBy,
      productImage,
    });

    await newProduct.save();
    const populatedProduct = await Product.findById(newProduct._id)
      .populate("createdBy")
      .populate("category");
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { createProduct, getProduct, deleteProduct };
