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

module.exports = {
    addPeserta,
  }