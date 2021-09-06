const express = require("express")
const router = express.Router()

const commentCtrl = require("../controllers/comment")

router.route("/").post(commentCtrl.createComment)

module.exports = router
