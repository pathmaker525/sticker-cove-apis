const dotenv = require("dotenv")

try {
  dotenv.config()
} catch (error) {
  console.error("Can't find dotenv file... Skipping...")
}

module.exports = {
  mongoURL: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpires: "8h",
  apiRoot: process.env.API_ROOT,
}
