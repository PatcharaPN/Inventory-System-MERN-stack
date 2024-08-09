const mongoose = require("mongoose");
const Schema = mongoose.Schema;

function generateProductID(prefix) {
  const randomNumber = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}${randomNumber}`;
}

const productSchema = new Schema({
  productID: {
    type: String,
    require: true,
    unique: true,
    default: function () {
      const prefix = this.prefix || "UNK";
      return generateProductID(prefix);
    },
  },
  prefix: {
    type: String,
    default: "UNK",
  },
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
