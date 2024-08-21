const Payment = require("../models/paymentModel");

const createPayment = async (req, res) => {
  try {
    const { products, createdBy, status } = req.body;

    if (!products || !createdBy) {
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
const getSumofPayment = async (req, res) => {
  try {
    const result = await Payment.countDocuments();
    res.status(200).json({
      amount: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getMounthSummary = async (req, res) => {
  try {
    const year = parseInt(req.query.year) || new Date().getFullYear();
    const summary = await Payment.aggregate([
      {
        $addFields: {
          month: { $month: "$createdAt" }, // ดึงเดือนจาก createdAt
          year: { $year: "$createdAt" }, // ดึงปีจาก createdAt
        },
      },
      {
        $match: {
          year: year, // กรองข้อมูลตามปีที่กำหนด
        },
      },
      {
        $group: {
          _id: { month: "$month", year: "$year" },
          totalPayments: { $sum: 1 }, // นับจำนวนการชำระเงิน
          totalAmount: { $sum: "$amount" }, // คำนวณยอดรวมการชำระเงิน (ถ้ามีฟิลด์ amount)
        },
      },
      {
        $addFields: {
          monthName: {
            $arrayElemAt: [
              [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ],
              { $subtract: ["$_id.month", 1] },
            ],
          },
        },
      },
      {
        $sort: { "_id.month": 1 }, // เรียงตามเดือน
      },
    ]);
    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({
      message: "Error when fetching Summary Data !!",
      error: error.message,
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
module.exports = {
  getMounthSummary,
  getSumofPayment,
  getAllPayment,
  createPayment,
};
