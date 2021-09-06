const ROLES = require("../../constants")
const Order = require("../models/order")
const RESPONSE = require("../../constants/response")

// Get sticker purchase order list
const getOrders = (req, res, next) => {
  // Get everything
  const where = {}

  // If user is not admin, return 401 and a message
  if (req.user.role !== ROLES.ADMIN) {
    res
      .status(RESPONSE.NOT_AUTHORIZED)
      .json({ message: "Error: You are not authorized to access this data" })
  }

  // Get entire order list
  Order.find(where)
    .then((orders) => {
      // If success, return entire order and a message
      res.json({ orders, message: "OK: Successfully get purchase order" })
    })
    .catch(next)
}

// Create new sticker purchase order
const createOrder = (req, res, next) => {
  // Create new order according to the order schema
  const newOrder = new Order(req.body)

  // Save new order into database
  newOrder
    .save()
    .then(() => {
      // If success, return 200:Ok and a message
      res.json({ message: "OK: New purchase order successfully created" })
    })
    .catch(next)
}

// Get an order with id
const getOrderById = (req, res, next) => {
  // Return order
  res.json(req.order, { message: "OK: Successfully get purchase order" })
}

// Update an order with id
const updateOrderById = (req, res, next) => {
  // Update order field with request body
  Object.assign(req.order, req.body)

  // Save new order
  req.order
    .save()
    .then((updatedOrder) => {
      // If success, return new order
      req.json(updatedOrder, {
        message: "OK: Successfully updated purchase order",
      })
    })
    .catch(next)
}

// Delete order with id
const deleteOrderById = (req, res, next) => {
  req.order
    .remove(() => {
      // If success, return deleted order
      res.json(req.order, {
        message: "OK: Successfully deleted purchase order",
      })
    })
    .catch(next)
}

const fetchOrderById = (req, res, next, id) => {
  // Find purchase order with order id
  Order.findById(id)
    .then((order) => {
      // If there is no such order
      if (!order) {
        // Returns 404 and a message
        res
          .status(RESPONSE.NOT_FOUND)
          .json({ message: "Error: Purchase order not found" })
      }

      // If this request is from non authorized pages
      if (!req.user.role && req.user.role !== ROLES.ADMIN) {
        // Returns 403 and a message
        res.status(RESPONSE.NOT_AUTHORIZED).json({
          message: "Error: You are not authorized to access this data",
        })
      }

      // Assign order field inside request and pass to next endpoint
      req.order = order
      next()
    })
    // If there is error, return with error string
    .catch(next)
}

// Export modules
module.exports = {
  getOrders,
  createOrder,
  getOrderById,
  updateOrderById,
  deleteOrderById,
  fetchOrderById,
}
