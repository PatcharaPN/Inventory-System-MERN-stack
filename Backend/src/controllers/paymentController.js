const Payment = require("../models/paymentModel");

const createPayment = async (req, res) => {
  try {
    const { products, createdBy, status } = req.body;

    if (!products || !createdBy || !status) {
      return res.status(400).json({
        message: "Some field is required !!",
      });
    }
    const newPayment = new Payment({
      createdBy,
      products,
      status,
    });
    await newPayment.save();

    const populatedPayment = await Payment.findById(newPayment._id)
      .populate("createdBy")
      .populate("products");

    res.status(201).json({
      message: "Payment history craeted",
      populatedPayment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getAllPayment = async (req, res) => {
  try {
    const payment = await Payment.find()
      .populate("products")
      .populate("createdBy");
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = { getAllPayment, createPayment };
