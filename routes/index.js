const router = require("express").Router()
const User = require("./userRouter")

router.use('/user', User)

module.exports = router