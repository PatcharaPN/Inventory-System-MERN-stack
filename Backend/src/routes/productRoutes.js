const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multerMiddleware");

const {
  getProduct,
  createProduct,
  deleteProduct,
  getInhandAmount,
} = require("../controllers/productController");

router.delete("/products/:id", deleteProduct);
router.get("/products", getProduct);
router.get("/getamount", getInhandAmount);
router.post("/products", upload.single("productImage"), createProduct);

module.exports = router;
