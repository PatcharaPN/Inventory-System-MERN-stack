const express = require("express");
const router = express.Router();
const {
  getMounthSummary,
  createPayment,
  getSumofPayment,
  getAllPayment,
} = require("../controllers/paymentController");

router.post("/payment", createPayment);
router.get("/payment", getAllPayment);
router.get("/paymentcount", getSumofPayment);
router.get("/getSummary", getMounthSummary);
module.exports = router;
