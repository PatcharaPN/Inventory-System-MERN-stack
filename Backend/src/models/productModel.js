const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  available: { type: Number, required: true },
  reserved: { type: Number, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  location: { type: String, required: true },
  productImage: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
