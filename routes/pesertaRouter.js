const express = require("express");
const router = express.Router()
const Peserta = require('../controllers/pesertaController')
const autentikasi = require("../middleware/auth")
// const {getAllUser} = require('../controllers/authController')

// endpoint add data peserta
router.post(
    "/create",
    // autentikasi,
    Peserta.addPeserta)


module.exports = router