const mandrill = require("node-mandrill")()
const Comment = require("../models/comment")
const RESPONSE = require("../../constants/response")

const createComment = (req, res, next) => {
  const newComment = new Comment(req.body)

  newComment
    .save()
    .then(() => {
      res.json({ message: "OK: We got your messages" })
    })
    .catch(() => {
      res.status(RESPONSE.SERVER_INTERNAL_ERROR).json({
        message: "Error: Something happend on server",
      })
    })
}

module.exports = {
  createComment,
}
