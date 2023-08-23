const express = require("express")
const router = express.Router()
let userController = require("../controller/userController")
let validator = require("../middleware/validator")

router.post("/register", validator.validateRegistration, userController.register)
router.post(
  "/login",
  validator.validatelogin,
  userController.login
);


module.exports = router