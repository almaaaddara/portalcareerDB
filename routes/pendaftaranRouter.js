const express = require("express");
const router = express.Router()
const Pendaftaran = require('../controllers/pendaftaranController')
const autentikasi = require("../middleware/auth")


// endpoint ganti status review
router.put(
    "/:id/review",
    // autentikasi,
    Pendaftaran.updateStatusToReviewed)

// endpoint ganti status diterima
router.put(
    "/:id/terima",
    // autentikasi,
    Pendaftaran.updateStatusDiterima)

// endpoint ganti status ditolak
router.put(
    "/:id/tolak",
    // autentikasi,
    Pendaftaran.updateStatusDitolak)



module.exports = router