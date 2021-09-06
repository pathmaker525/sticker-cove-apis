const express = require("express")
const router = express.Router()

const orderCtrl = require("../controllers/order")

router.route("/").get(orderCtrl.getOrders).post(orderCtrl.createOrder)

router
  .route("/:id")
  .get(orderCtrl.getOrderById)
  .put(orderCtrl.updateOrderById)
  .delete(orderCtrl.deleteOrderById)

router.param("id", orderCtrl.fetchOrderById)

module.exports = router
