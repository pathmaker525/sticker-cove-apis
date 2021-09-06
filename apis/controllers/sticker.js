const jwt = require("jsonwebtoken")
const config = require("../../config")
const Sticker = require("../models/sticker")

const getStickers = (req, res, next) => {}

const addSticker = (req, res, next) => {}

const getStickerByType = (req, res, next) => {}

const setStickerByType = (req, res, next) => {}

const updateStickerByType = (req, res, next) => {}

const deleteStickerByType = (req, res, next) => {}

const fetchStickerByType = (req, res, next, type) => {}

module.exports = {
  getStickers,
  addSticker,
  getStickerByType,
  setStickerByType,
  updateStickerByType,
  deleteStickerByType,
  fetchStickerByType,
}
