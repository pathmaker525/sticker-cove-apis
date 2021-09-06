const express = require("express")
const mongoose = require("mongoose")
const expressJwt = require("express-jwt")
const apiRoutes = require("../apis")
const config = require("../config")

// const authMiddleware = expressJwt({
//   secret: config.jwtSecret,
//   algorithms: ["HS256"],
//   requestProperty: "user",
// })

module.exports = (app, callback) => {
  mongoose.Promise = global.Promise
  mongoose.connect(
    config.mongoURL,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    },
    (err) => {
      if (err) {
        console.error(
          err.message ||
            "=== Please install MongoDB and make sure it is running! ==="
        )
        throw err
      }

      console.log("^~^ Mongo DB Connected :P '~`")

      if (typeof callback === "function") {
        callback()
      }
    }
  )

  // app.use(
  //   config.apiRoot,
  //   authMiddleware.unless({
  //     path: ["/api/auth/login/", "/api/order/createOrder/"],
  //   })
  // )
  app.use(config.apiRoot, apiRoutes)
}
