const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const helmet = require("helmet")
const argv = require("./helpers/argv")
const logger = require("./helpers/logger")
const port = require("./port")
const backendSetup = require("./middlewares/backendMiddleware")

const app = express()
app.set("trust proxy", true)
app.use('*', cors());
app.use(express.json())
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});
app.use(express.urlencoded({ limit: "20mb", extended: false }))
app.use(helmet())
app.use(morgan("combined"))
app.use(express.static("public"))
app.use(function (err, req, res, next) {
  res.status(err.status || 500).send(err)
})

backendSetup(app, () => { })
// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST
const prettyHost = customHost || "localhost"

app.listen(port, (err) => {
  if (err) {
    return logger.error(err.message)
  }

  logger.appStarted(port, prettyHost)
})
