const jwt = require("jsonwebtoken")
const config = require("../../config")

const User = require("../models/user")
const ROLES = require("../../constants")
const RESPONSE = require("../../constants/response")

const login = (req, res, next) => {
  // Find a user with email. email is id here
  User.findOne({ email: req.body.email })
    // Select _id and email from user schema
    .select("_id email role password")
    // Execute query
    .exec()
    .then((user) => {
      // If user doesn't exist, return 404:NOT FOUND and a message
      if (!user) {
        res.state(RESPONSE.NOT_FOUND).json({ message: "Error: User not found" })
      }

      // If user is not admin, then return 403 and a message
      if (user.role !== ROLES.ADMIN) {
        res
          .state(RESPONSE.FORBIDDEN)
          .json({ message: "Warning: Only admin can login admin dashboard" })
      }

      // Check whether the password user typed is right or wrong
      return (
        user
          .authenticate(req.body.password)
          // If the password is right
          .then(() => {
            // Create json web token for authorising
            const token = jwt.sign(
              {
                _id: user._id,
                email: user.email,
                role: user.role,
              },
              config.jwtSecret,
              { expiresIn: config.jwtExpires }
            )

            // If everything is okay, return 200: OK and a token
            res.json({ token, message: "OK: Login succeed" })
          })
          // If password is wrong, return 403 and a message
          .catch(() => {
            res
              .status(RESPONSE.FORBIDDEN)
              .json({ message: "Warning: Password does not match" })
          })
      )
    })
    .catch(next)
}

const resetPassword = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .select("_id email role password")
    .exec()
    .then((user) => {
      // If there is not such user, return 404
      if (!user) {
        res
          .status(RESPONSE.NOT_FOUND)
          .json({ message: "Error: User not found" })
      }

      // If requested user is not admin, return 403
      if (user.role !== ROLES.ADMIN) {
        res
          .status(RESPONSE.FORBIDDEN)
          .json({ message: "Error: User is not Admin" })
      }

      // If request body has password to be updated, update user model
      if (req.body.password) {
        Object.assign(user, {
          password: req.body.password,
        })
      }

      // And save user and rethrn new token
      user.save().then((updatedUser) => {
        // Sign a new token with new user _id, email, jwt secret, and jwt expire date
        const token = jwt.sign(
          {
            _id: updatedUser._id,
            email: updatedUser.email,
            role: updatedUser.role,
          },
          config.jwtSecret,
          { expiresIn: config.jwtExpires }
        )

        // Return 200: OK with a message
        res.json({ token, message: "OK: Password updated" })
      })
    })
    .catch(next)
}

module.exports = {
  login,
  resetPassword,
}
