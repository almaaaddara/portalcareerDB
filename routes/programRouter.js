const express = require("express");
const router = express.Router()
const Program = require('../controllers/programController')
const autentikasi = require("../middleware/auth")
const checkRole = require("../middleware/checkRole")


// endpoint add data program
router.post(
    "/create",
    Program.addProgram)

// endpoint read all program
router.get("/", Program.findProgram)

// endpoint read program by id
router.get("/:id", Program.findProgramById)

// endpoint delete peserta
router.delete(
    "/delete/:id", Program.deleteProgram
)

module.exports = router