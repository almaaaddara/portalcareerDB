const { Peserta } = require("../models")
const ApiError = require("../utils/apiError")
const Sequelize = require("sequelize")
const Op = Sequelize.Op

const addPeserta = async (req, res, next) => {
    try {
        const {
            nomor_induk, 
            nama, 
            alamat, 
            no_whatsapp, 
            tempat_tanggal_lahir, 
            jenis_kelamin, 
            kategori_pendidikan, 
            tingkat_pendidikan, 
            institusi, 
            jurusan, 
            program_studi} = req.body
        const thisPeserta = await Peserta.findOne({
            where: {nomor_induk}
        })
        if (thisPeserta) {
            return next(new ApiError("Nomor induk telah terdaftar", 400))
        }

        const newPeserta = await Peserta.create({
            nomor_induk, 
            nama, 
            alamat, 
            no_whatsapp, 
            tempat_tanggal_lahir, 
            jenis_kelamin, 
            kategori_pendidikan, 
            tingkat_pendidikan, 
            institusi, 
            jurusan, 
            program_studi,
            id_user: req.user.id,
        })
        res.status(200).json({
            status: "Success add Peserta",
            data: {
              newPeserta
            }
          })
    } catch (err) {
        next(new ApiError(err.message, 500))
    }
}

const findPeserta = async (req, res, next) => {
    try {
        const peserta = await Peserta.findAll()

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

const findPesertaById = async (req, res, next) => {
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

const deletePeserta = async (req, res, next) => {
    try {
      const peserta = await Peserta.findOne({
        where: {
          id: req.params.id
        }
      })
  
      if (!peserta) {
        return next(new ApiError(`Peserta dengan ID ${req.params.id} tidak ditemukan`, 404))
      }
  
      await Peserta.destroy({
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
    addPeserta,
    findPeserta,
    findPesertaById,
    deletePeserta
  }