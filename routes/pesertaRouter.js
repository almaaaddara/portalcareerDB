const express = require("express");
const router = express.Router()
const Peserta = require('../controllers/pesertaController')
const autentikasi = require("../middleware/auth")

// endpoint add data peserta pendaftar
router.post(
    "/add",
    autentikasi,
    Peserta.addPesertaPendaftar)

// endpoint read all peserta
router.get("/", Peserta.findAllPeserta)

// endpoint read peserta by id
router.get("/:id", Peserta.findPesertaById)


router.get("/:status_pendaftaran", Peserta.findDataByStatus)

// endpoint delete peserta
router.delete(
    "/delete/:id", Peserta.deletePeserta
)

module.exports = router