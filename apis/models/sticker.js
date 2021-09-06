const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ROLES = require("../../constants")

const stickerSchema = new Schema({
  image: {
    type: String,
    unique: true,
    required: "Sticker image URL can't be empty",
    match: [
      /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/,
      "Please fill a valid url",
    ],
  },
  type: {
    type: String,
    required: "Sticker type can't be empty",
  },
  quantity: {
    type: Array,
    required: "Quantity can't be empty",
  },
})

module.exports = mongoose.model("Sticker", stickerSchema)
