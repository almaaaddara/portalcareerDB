const { Pendaftaran } = require("../models")
const ApiError = require("../utils/apiError")
const Sequelize = require("sequelize")

  const updateStatusToReviewed = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Cari pendaftaran berdasarkan ID
        const pendaftaran = await Pendaftaran.findByPk(id);

        // Jika pendaftaran tidak ditemukan, kirim respons error
        if (!pendaftaran) {
            return next(new ApiError(`Pendaftaran dengan ID ${id} tidak ditemukan`, 404));
        }

        // Update status pendaftaran menjadi 'Direview'
        pendaftaran.status_pendaftaran = 'Direview';

        // Simpan perubahan ke dalam database
        await pendaftaran.save();

        res.status(200).json({
            status: "Success",
            message: `Status pendaftaran dengan ID ${id} berhasil diupdate menjadi 'Direview'`
        });
    } catch (err) {
        next(new ApiError(err.message, 500));
    }
};

const updateStatusDiterima = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Cari pendaftaran berdasarkan ID
        const pendaftaran = await Pendaftaran.findByPk(id);

        // Jika pendaftaran tidak ditemukan, kirim respons error
        if (!pendaftaran) {
            return next(new ApiError(`Pendaftaran dengan ID ${id} tidak ditemukan`, 404));
        }

        // Update status pendaftaran
        pendaftaran.status_pendaftaran = 'Diterima';

        // Simpan perubahan ke dalam database
        await pendaftaran.save();

        res.status(200).json({
            status: "Success",
            message: `Status pendaftaran dengan ID ${id} berhasil diupdate menjadi ${pendaftaran.status_pendaftaran}`
        });
    } catch (err) {
        next(new ApiError(err.message, 500));
    }
};

const updateStatusDitolak = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Cari pendaftaran berdasarkan ID
        const pendaftaran = await Pendaftaran.findByPk(id);

        // Jika pendaftaran tidak ditemukan, kirim respons error
        if (!pendaftaran) {
            return next(new ApiError(`Pendaftaran dengan ID ${id} tidak ditemukan`, 404));
        }

        // Update status pendaftaran
        pendaftaran.status_pendaftaran = 'Ditolak';

        // Simpan perubahan ke dalam database
        await pendaftaran.save();

        res.status(200).json({
            status: "Success",
            message: `Status pendaftaran dengan ID ${id} berhasil diupdate menjadi ${pendaftaran.status_pendaftaran}`
        });
    } catch (err) {
        next(new ApiError(err.message, 500));
    }
};

module.exports = {
    updateStatusToReviewed,
    updateStatusDiterima,
    updateStatusDitolak
};