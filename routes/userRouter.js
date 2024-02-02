const express = require("express");
const router = express.Router()
const Auth = require('../controllers/userController')
const autentikasi = require("../middleware/auth")
// const {getAllUser} = require('../controllers/authController')

// endpoint regist peserta
router.post("/register", Auth.register)

// endpoint login peserta
router.post("/login", Auth.login)
router.get("/", 
autentikasi, Auth.checkToken)
router.get("/get", Auth.findUser)
router.get("/role", Auth.getUserRole)

module.exports = router