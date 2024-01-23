const express = require("express");
const router = express.Router()
const Peserta = require('../controllers/pesertaController')
const autentikasi = require("../middleware/auth")
// const {getAllUser} = require('../controllers/authController')

// endpoint add data peserta
router.post(
    "/create",
    autentikasi,
    Peserta.addPeserta)

// endpoint read all peserta
router.get("/", Peserta.findPeserta)

// endpoint read peserta by id
router.get("/:id", Peserta.findPesertaById)

// endpoint delete peserta
router.delete(
    "/delete/:id", Peserta.deletePeserta
)

module.exports = router