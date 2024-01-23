const { Program } = require("../models")
const ApiError = require("../utils/apiError")
const Sequelize = require("sequelize")
const Op = Sequelize.Op

const addProgram = async (req, res, next) => {
    try {
        const {
            nama_program,
            deskripsi_program,
            manfaat_program
        } = req.body
        const thisProgram = await Program.findOne({
            where: {nama_program}
        })
        if (thisProgram) {
            return next(new ApiError("Program telah terdaftar", 400))
        }

        const newProgram = await Program.create({
            nama_program,
            deskripsi_program,
            manfaat_program
        })
        res.status(200).json({
            status: "Success add new program",
            data: {
              newProgram
            }
          })
    } catch (err) {
        next(new ApiError(err.message, 500))
    }
}

const findProgram = async (req, res, next) => {
    try {
        const program = await Program.findAll()

        res.status(200).json({
            status: "Succes",
            data: {
              program
            }
          })
    } catch (err) {
        next(new ApiError(err.message, 500))
    }
}

const findProgramById = async (req, res, next) => {
    try {
        const peserta = await Peserta.findOne({
            where: {id: req.params.id}
        })

        res.status(200).json({
            status: "Succes",
            data: {
              peserta
            }
          })
    } catch (err) {
        next(new ApiError(err.message, 500))
    }
}

const deleteProgram = async (req, res, next) => {
    try {
      const program = await Program.findOne({
        where: {
          id: req.params.id
        }
      })
  
      if (!program) {
        return next(new ApiError(`Program dengan ID ${req.params.id} tidak ditemukan`, 404))
      }
  
      await Program.destroy({
        where: {
          id: req.params.id
        }
      })
  
      res.status(200).json({
        status: "Success",
        message: "Deleted successfully"
      })
    } catch (err) {
      next(new ApiError(err.message, 500))
    }
  }

module.exports = {
    addProgram,
    findProgram,
    findProgramById,
    deleteProgram
  }