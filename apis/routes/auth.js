const express = require("express")
const router = express.Router()

const authCtrl = require("../controllers/auth")

router.route("/login").post(authCtrl.login)

router.route("/reset").post(authCtrl.resetPassword)

module.exports = router
