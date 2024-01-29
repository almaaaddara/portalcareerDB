const express = require("express");
const router = express.Router()
const Peserta = require('../controllers/pesertaController')
const autentikasi = require("../middleware/auth");
const upload = require("../middleware/upload");

// endpoint add data peserta pendaftar
router.post(
    "/add",
    autentikasi,
    upload.fields([
        {name: 'surat_pengantar', maxCount: 1},
        {name: 'pas_foto', maxCount: 1},
    ]),
    Peserta.addPesertaPendaftar)

// endpoint read all peserta
router.get("/get", Peserta.findAllPeserta)
router.get("/bystatus", Peserta.findDataByStatus)

// endpoint read peserta by id
router.get("/:id", Peserta.findPesertaById)



// endpoint delete peserta
router.delete(
    "/delete/:id", Peserta.deletePeserta
)

module.exports = router