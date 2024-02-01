const express = require("express");
const router = express.Router()
const Pendaftaran = require('../controllers/pendaftaranController')
const autentikasi = require("../middleware/auth");
const { route } = require("./pesertaRouter");
const upload = require("../middleware/upload");
const checkRole = require("../middleware/checkRole")

// endpoint read all peserta
router.get("/", autentikasi, Pendaftaran.findAllPeserta)

// endpoint read peserta by id
router.get("/:id", autentikasi, Pendaftaran.findPesertaById)

// router.get("/bystatus", autentikasi, Pendaftaran.findDataByStatus)

// endpoint ganti status review
router.put(
    "/:id/review",
    autentikasi,
    checkRole.checkRoleSekretaris,
    Pendaftaran.updateStatusToReviewed)

// endpoint ganti status diterima
router.put(
    "/:id/terima",
    autentikasi,
    checkRole.checkRoleSDM,
    Pendaftaran.updateStatusDiterima)

// endpoint ganti status ditolak
router.put(
    "/:id/tolak",
    autentikasi,
    checkRole.checkRoleSDM,
    Pendaftaran.updateStatusDitolak)

// endpoint update surat balasan
router.put("/:id_pendaftaran/surat-balasan",
    autentikasi,
    checkRole.checkRoleSDM,
    upload,
    Pendaftaran.updateSuratBalasan)

router.put("/:id/pesan-sekretaris", 
    autentikasi, 
    checkRole.checkRoleSekretaris, 
    Pendaftaran.updatePesanSekretaris)

router.put("/:id/pesan-sdm", 
    autentikasi, 
    checkRole.checkRoleSDM, 
    Pendaftaran.updatePesanSDM)

module.exports = router