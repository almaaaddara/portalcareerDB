const express = require("express");
const router = express.Router()
const Auth = require('../controllers/userController')
// const {getAllUser} = require('../controllers/authController')

router.post("/register", Auth.register)

module.exports = router

// router.get("/", getAllUser);

// router.get("/:name", (req, res) => {
//     res.send(`heres your data user ${req.params.name}`);
// });

// router.post("/", (req, res) => {
//     res.send("user created");
// });

// router.put("/", (req, res) => {
//     res.send("user updated");
// });

// router.delete("/", (req, res) => {
//     res.send("user deleted");
// });

module.exports = router