const express = require("express");
const router = express.Router()
const Program = require('../controllers/programController')
const autentikasi = require("../middleware/auth")


// endpoint add data program
router.post(
    "/create",
    // autentikasi,
    Program.addProgram)

// endpoint read all peserta
router.get("/", Program.findProgram)

// endpoint read peserta by id
router.get("/:id", Program.findProgramById)

// endpoint delete peserta
router.delete(
    "/delete/:id", Program.deleteProgram
)

module.exports = router