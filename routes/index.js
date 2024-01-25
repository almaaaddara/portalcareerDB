const router = require("express").Router()
const User = require("./userRouter")
const Peserta = require("./pesertaRouter")
const Program = require("./programRouter")
const Pendaftaran = require("./pendaftaranRouter")


router.use('/user', User)
router.use('/peserta', Peserta)
router.use('/program', Program)
router.use('/pendaftaran', Pendaftaran)


module.exports = router