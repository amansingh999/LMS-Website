const express = require("express");
const {
  createOrder,
  capturePaymentAndFinalizeOrder,
  directPurchase
} = require("../../controllers/student-controller/order-controller");

const router = express.Router();

router.post("/create", createOrder);
router.post("/capture", capturePaymentAndFinalizeOrder);
router.post("/direct-purchase", directPurchase);

module.exports = router;
