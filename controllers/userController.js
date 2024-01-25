const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const ApiError = require("../utils/apiError");

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

const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({
            where: {email},
        });

        if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign(
              {
                id: user.id,
                role: user.role,
                email: user.email
              },
              process.env.JWT_SECRET
            )
            res.status(200).json({
              status: "Success",
              message: "Login successful",
              user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
              jwt: token
            });
          } else {
            next(new ApiError("Email or password does not match", 401))
          }
        } catch (err) {
          next(new ApiError(err.message, 500))
        }
}

const checkToken = async (req, res, next) => {
    try {
      res.status(200).json({
        status: "Success",
        data: {
          user: req.user
        }
      })
    } catch (err) {
      next(new ApiError(err.message, 500))
    }
  }

  const findUser = async (req, res, next) => {
    try {
        const user = await User.findAll()

        res.status(200).json({
            status: "Succes",
            data: {
              user
            }
          })
    } catch (err) {
        next(new ApiError(err.message, 500))
    }
}

module.exports = {
    register,
    login,
    checkToken,
    findUser
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