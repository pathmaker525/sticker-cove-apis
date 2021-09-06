const mongoose = require("mongoose")
const Schema = mongoose.Schema

const paymentSchema = new Schema(
  {
    amount: {
      type: Number,
      required: "Amount is required",
    },
    email: {
      type: String,
      required: true,
    },
    meta: {
      type: String,
      required: true,
    },
    tx_ref: {
      type: String
    },
    pi: {
      type: String,
      unique: true,
    },
    status: {
      type: String,
      trim: true,
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Payment", paymentSchema)
