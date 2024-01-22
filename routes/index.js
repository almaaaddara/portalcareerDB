const router = require("express").Router()
const User = require("./userRouter")
const Peserta = require("./pesertaRouter")


router.use('/user', User)
router.use('/peserta', Peserta)

module.exports = router