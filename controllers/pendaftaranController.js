const { Pendaftaran, Peserta, Program } = require("../models")
const ApiError = require("../utils/apiError")
const Sequelize = require("sequelize")
const imagekit = require("../libs/imagekit")

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

const updateSuratBalasan = async (req, res, next) => {
    try {
      const { id_pendaftaran } = req.params;
      const { files } = req;

      // Pastikan file PDF surat balasan tersedia
    if (!files || !files["pdfFile"]) {
        throw new ApiError("File PDF surat balasan tidak ditemukan", 400);
      }
  
    let surat_balasan;
  
    // Dapatkan ekstensi file
    const split = files.pdfFile[0].originalname.split(".");
    const extension = split[split.length - 1];
  
    // Upload file ke imagekit
    const uploadedFile = await imagekit.upload({
        file: files.pdfFile[0].buffer,
        fileName: `File-${Date.now()}.${extension}`,
    });
  
    surat_balasan = uploadedFile.url;
  
    const [updatedPendaftaran] = await Pendaftaran.update(
        { surat_balasan},
        {where: {id: id_pendaftaran}, returning: true}
        );
  
    res.status(200).json({
        status: "Success",
        message: "Surat balasan berhasil diperbarui",
        data:
          updatedPendaftaran
      });
    } catch (err) {
      next(new ApiError(err.message, 500));
    }
  };

// Menampilkan seluruh data peserta
const findAllPeserta = async (req, res, next) => {
    try {
        const allData = await Pendaftaran.findAll({
          include: [Peserta]
        })

        // Jika tidak ada data yang ditemukan, kirim respons 404
        if (!allData || allData.length === 0) {
          return res.status(404).json({
              status: "Not Found",
              message: "Data peserta tidak ditemukan"
          });
      }

        res.status(200).json({
            status: "Succes",
            data: allData
          })
    } catch (err) {
        next(new ApiError(err.message, 500))
    }
}

// Menampilkan data peserta pendaftar by id
const findPesertaById = async (req, res, next) => {
    try {
        const pesertabyid = await Pendaftaran.findOne({
            where: {id: req.params.id},
            include: [Peserta]
        })

        // Jika data tidak ditemukan, kirim respons 404
        if (!pesertabyid) {
          return res.status(404).json({
              status: "Not Found",
              message: "Data tidak ditemukan"
          });
      }

        res.status(200).json({
            status: "Succes",
            data: pesertabyid
          })
    } catch (err) {
        next(new ApiError(err.message, 500))
    }
}

// Menampilkan data peserta pendaftar by status
const findDataByStatus = async (req, res, next) => {
  
    try {
        const { status_pendaftaran } = req.query;
        if(!status_pendaftaran){
          return next(new ApiError('Status tidak ditemukan', 404))
        }
        console.log("Status yang diterima:", status_pendaftaran);
  
        // Cari pendaftaran yang memiliki status tertentu, sertakan relasi dengan model Peserta
        const data = await Pendaftaran.findAll({
            where: {status_pendaftaran},
            include: [Peserta]
        });
  
        // Kirim respons JSON dengan data yang ditemukan
        res.status(200).json({
            status: "Success",
            data: data
        });
    } catch (err) {
        // Tangani kesalahan dan lanjutkan ke middleware error handler
        next(new ApiError(err.message, 500));
    }
  }

module.exports = {
    findAllPeserta,
    findPesertaById,
    findDataByStatus,
    updateStatusToReviewed,
    updateStatusDiterima,
    updateStatusDitolak,
    updateSuratBalasan,
};