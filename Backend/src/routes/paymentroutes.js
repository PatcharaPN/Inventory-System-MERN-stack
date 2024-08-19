const express = require("express");
const router = express.Router();
const {
  createPayment,
  getAllPayment,
} = require("../controllers/paymentController");

router.post("/payment", createPayment);
router.get("/payment", getAllPayment);

module.exports = router;
