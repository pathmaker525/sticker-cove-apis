const express = require("express")
const ROUTERS = require("../constants")

const router = express.Router()

const authRoute = require("./routes/auth")
const orderRoute = require("./routes/order")
const stickerRoute = require("./routes/sticker")
const stripeRoute = require("./routes/stripe")
const commentRoute = require("./routes/comment")

router.use(ROUTERS.AUTH_ROUTE, authRoute)
router.use(ROUTERS.ORDER_ROUTE, orderRoute)
router.use(ROUTERS.STICKER_ROUTE, stickerRoute)
router.use(ROUTERS.STRIPE_ROUTE, stripeRoute)
router.use(ROUTERS.COMMENT_ROUTE, commentRoute)

module.exports = router
