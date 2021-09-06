const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const ROLES = require("../../constants")

const Schema = mongoose.Schema
const SALT_ROUNDS = 1999

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: "Email address is required",
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  role: {
    type: String,
    trim: true,
    required: false,
    default: ROLES.USER,
  },
  password: {
    type: String,
    select: false,
  },
})

userSchema.method.hashPassword = function hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
      if (err) {
        return reject("BCRYPT: Fail to generate hash")
      }

      return resolve(hash)
    })
  })
}

userSchema.methods.authenticate = function authenticate(password) {
  return new Promise((resolve, reject) => {
    bcrypt
      .compare(password, this.password)
      .then((allow) => {
        if (!allow) {
          return reject("BCRYPT: Wrong password")
        }

        return resolve("BCRYPT: Passed")
      })
      .catch(reject)
  })
}

userSchema.pre("save", function preSave(next) {
  if (this.password && this.isModified("password")) {
    this.password = this.hashPassword(this.password)
      .then((password) => {
        this.password = password

        next()
      })
      .catch(next)
  } else {
    next()
  }
})

module.exports = mongoose.model("Users", userSchema)
