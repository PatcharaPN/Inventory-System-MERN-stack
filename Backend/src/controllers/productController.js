const Product = require("../models/productModel");

function generateCode(prefix) {
  const randomNumber = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}${randomNumber}`;
}

const getProduct = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("createdBy")
      .populate("category");
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const getLowStock = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $match: {
          stock: { $lt: 10 },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          total: 1,
        },
      },
    ]);
    res.status(201).json(products);
  } catch (error) {
    console.error("Error fetching low stock products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId).exec();
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(deletedProduct);
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error when deleting product" });
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      brand,
      dimension,
      priceValue,
      name,
      price,
      store,
      stock,
      available,
      reserved,
      location,
      createdBy,
      category,
      prefix = "UNK",
    } = req.body;

    if (!createdBy) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "Product image is required" });
    }

    const productImage = req.file.path.replace("public/", "");
    const productId = generateCode(prefix);

    const newProduct = new Product({
      prefix,
      productID: productId,
      name,
      price,
      store,
      stock,
      available,
      location,
      reserved,
      category,
      createdBy,
      productImage,
      brand,
      dimension,
      priceValue,
    });

    await newProduct.save();

    const populatedProduct = await Product.findById(newProduct._id)
      .populate("createdBy")
      .populate("category");

    res.status(201).json(populatedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: error.message });
  }
};

const getInhandAmount = async (req, res) => {
  try {
    const getInhand = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalStock: { $sum: "$stock" },
        },
      },
    ]);
    res.status(200).json(getInhand);
  } catch (error) {
    console.error("Error getting inhand amount:", error);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getLowStock,
  createProduct,
  getProduct,
  deleteProduct,
  getInhandAmount,
};
