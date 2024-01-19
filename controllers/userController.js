const { User } = require('../models')
const bcrypt = require('bcrypt')
const ApiError = require("../utils/apiError")

const register = async (req,res, next) => {
    try {
        const {email, password} = req.body;

        const existingUser = await User.findOne({
            where: {email}
        });
        if (existingUser) {
            return res.status(400).json({
                message: "Email telah terdaftar"
            });
        }

        const saltRounds = 10
        const hashedPassword = bcrypt.hashSync(password, saltRounds)

        const newUser = await User.create({
            email, 
            password: hashedPassword
        });
        return res.status(200).json({
            message: 'User registered successfully',
            user: {
                email: newUser.email,
                role: newUser.role,
            },
        })
    } catch (err) {
        next(new ApiError(err.message, 500))
      }
}

module.exports = {
    register,
    // login
}
// exports.getAllUser = (req, res) => {
//     res.status(200).json({
//         status: "success",
//         data: [
//             {
//                 "id": "1",
//                 "nama": "almaa"
//             },
//             {
//                 "id": "2",
//                 "nama": "olin"
//             },
//             {
//                 "id": "3",
//                 "nama": "unis"
//             }
//         ]
//     })
// }

// exports.getAllUser = (req, res) => {
//     let email = req.body.email;
//     let password = req.body.password;

//     if (!email && !password) {
//         return res.status(400).json({
//             status: "failed",
//             error: "Validasi gagal"
//         })
//     }

//     return res.status(200).json({
//         status: "success",
//         message: "validasi berhasil"
//     })
// }