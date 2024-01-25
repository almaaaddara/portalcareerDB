const express = require("express");
const router = express.Router()
const Pendaftaran = require('../controllers/pendaftaranController')
const autentikasi = require("../middleware/auth")


// endpoint add data program
router.post(
    "/add",
    autentikasi,
    Pendaftaran.addPesertaPendaftar)

// endpoint read all peserta
// router.get("/", Program.findProgram)


module.exports = router