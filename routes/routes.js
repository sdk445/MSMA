const express = require("express")
const mediaController = require("../controller/mediaController")
const router = express.Router()
const userController = require("../controller/userController")
const validator = require("../middleware/validator")
const auth = require("../middleware/auth")

router.post(
  "/register",
  validator.validateRegistration,
  userController.register
)
router.post("/login", validator.validatelogin, userController.login)
router.post(
  "/addContent",
  validator.validateMovie,
  auth.verifyToken,
  mediaController.addMovie
)
router.post("/addSeries", auth.verifyToken, mediaController.addseries)
router.get("/getSeries", auth.verifyToken, mediaController.getSeries)
router.post("/updateSeries", auth.verifyToken, mediaController.updateSeries)
router.post("/addnewSeason", auth.verifyToken, mediaController.addnewSeason)
router.post("/deleteSeries", auth.verifyToken, mediaController.deleteSeries)

router.get("/getContent", auth.verifyToken, mediaController.getContent)
router.get("/searchContent", auth.verifyToken, mediaController.searchContent)
router.get(
  "/getlog",
  auth.verifyToken,
  auth.adminRoute,
  userController.getUserlog
)

module.exports = router
