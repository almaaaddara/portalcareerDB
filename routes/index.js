const router = require("express").Router()
const User = require("./userRouter")
const Peserta = require("./pesertaRouter")
const Program = require("./programRouter")


router.use('/user', User)
router.use('/peserta', Peserta)
router.use('/program', Program)

module.exports = router