const express = require("express")
const router = express.Router()

const stripeCtrl = require("../controllers/stripe")

router.route("/").get(stripeCtrl.verifyPayment).post(stripeCtrl.makePayments)

module.exports = router
