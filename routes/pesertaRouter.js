const express = require("express");
const router = express.Router()
const Peserta = require('../controllers/pesertaController')
const autentikasi = require("../middleware/auth");
const upload = require("../middleware/upload");

// endpoint add data peserta pendaftar
router.post("/add", autentikasi, upload, Peserta.addPesertaPendaftar);

router.get("/bystatus", Peserta.findDataByStatus)

// endpoint delete peserta
router.delete(
    "/delete/:id", Peserta.deletePeserta
)

module.exports = router