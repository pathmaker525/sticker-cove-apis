const express = require("express")
const router = express.Router()

const stickerCtrl = require("../controllers/sticker")

router.route("/").get(stickerCtrl.getStickers).post(stickerCtrl.addSticker)

router
  .route("/:type")
  .get(stickerCtrl.getStickerByType)
  .post(stickerCtrl.setStickerByType)
  .put(stickerCtrl.updateStickerByType)
  .delete(stickerCtrl.deleteStickerByType)

router.param("type", stickerCtrl.fetchStickerByType)

module.exports = router
