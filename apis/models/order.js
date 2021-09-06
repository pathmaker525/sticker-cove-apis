const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ROLES = require("../../constants")

const validateMinimum = (quantity) => quantity >= 10

const orderSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: "Email address is required",
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    phone: {
      type: String,
      trim: true,
      required: "Phone number is required",
    },
    firstname: {
      type: String,
      trim: true,
      lowercase: true,
      required: "User firstname is required",
    },
    lastname: {
      type: String,
      trim: true,
      lowercase: true,
      required: "User lastname is required",
    },
    company: {
      type: String,
      trim: true,
      lowercase: true,
      required: false,
    },
    streetAddress: {
      type: String,
      trim: true,
      lowercase: true,
      required: "Street address is required",
    },
    city: {
      type: String,
      trim: true,
      lowercase: true,
      required: "City is required",
    },
    state: {
      type: String,
      trim: true,
      lowercase: true,
      required: "State is required",
    },
    zip: {
      type: Number,
      trim: true,
      required: "Zip code is required",
    },
    deliveryDate: {
      type: String,
      trim: true,
      lowercase: true,
      required: "Delivery date is required",
    },
    orders: [
      {
        url: {
          type: String,
          trim: true,
          lowercase: true,
        },
        size: [{ type: Number }, { type: Number }],
        instruction: {
          type: String,
          trim: true,
        },
        type: {
          type: String,
          trim: true,
          lowercase: true,
          required: "Sticker price is required",
        },
        quantity: {
          type: Number,
          lowercase: true,
          required: "Order price is required",
        },
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      trim: true,
      default: ROLES.LABEL.ONHOLD,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Order", orderSchema)
