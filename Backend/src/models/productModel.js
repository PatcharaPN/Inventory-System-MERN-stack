const mongoose = require("mongoose");
const Brand = require("./brandModel");
const Schema = mongoose.Schema;

function generateProductID(prefix) {
  const randomNumber = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}${randomNumber}`;
}

const productSchema = new Schema({
  productID: {
    type: String,
    unique: true,
  },
  name: { type: String },
  price: { type: Number, default: 1 },
  stock: { type: Number, default: 1 },
  sku: { type: String },
  unit: { type: String },
  priceValue: { type: Number, default: 1 },
  dimension: { type: Number, default: 1 },
  brand: { type: Schema.Types.ObjectId, ref: "Brand" },
  available: { type: Number, default: 1 },
  reserved: { type: Number, default: 0 },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  store: { type: Schema.Types.ObjectId, ref: "Store" },
  location: { type: String },
  productImage: { type: String },
});

productSchema.pre("save", async function (next) {
  if (!this.isModified("brand") || !this.isNew) return next();
  try {
    const brand = await Brand.findById(this.brand);
    if (brand) {
      this.productID = generateProductID(brand.prefix);
    } else {
      this.productID = generateProductID("UNK");
    }
    next();
  } catch (error) {
    next(error);
  }
});
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
