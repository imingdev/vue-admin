/**
 * Created by admin on 2016/12/5.
 */
const slideController = require('./slideController')
const overViewController = require('./overViewController')
const userController = require('./userController')
const fileController = require('./fileController')
const menuController = require('./menuController')
const mediaController = require('./mediaController')
const courseController = require('./courseController')
const lecturerController = require('./lecturerController')
const insuranceController = require('./insuranceController')

module.exports = function (app, express) {
  const apiRouter = express.Router();
  slideController(apiRouter)
  overViewController(apiRouter)
  userController(apiRouter)
  fileController(apiRouter)
  menuController(apiRouter)
  mediaController(apiRouter)
  courseController(apiRouter)
  lecturerController(apiRouter)
  insuranceController(apiRouter)
  app.use("", apiRouter)
}
