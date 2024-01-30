const { Peserta, Pendaftaran, Program } = require("../models")
const ApiError = require("../utils/apiError")
const Sequelize = require("sequelize")
const imagekit = require("../libs/imagekit")
// const Op = Sequelize.Op

// Menambahkan data peserta pendaftar baru
const getProgramId = async (namaProgram) => {
  const program = await Program.findOne({
    where: { nama_program: namaProgram },
  });

  if (!program) {
    // Handle jika program tidak ditemukan
    throw new ApiError(`Program ${namaProgram} tidak ditemukan`, 404);
  }

  return program.id;
};

const addPesertaPendaftar = async (req, res, next) => {
  try {
    const userBody = req.body;
    const { files } = req;

    let surat_pengantar;
    let pas_foto;

    if (files["pdfFile"]) {
      // Dapatkan ekstensi file
      const split = files.pdfFile[0].originalname.split(".");
      const extension = split[split.length - 1];

      // Upload file ke imagekit
      const uploadedFile = await imagekit.upload({
        file: files.pdfFile[0].buffer,
        fileName: `File-${Date.now()}.${extension}`,
      });

      surat_pengantar = uploadedFile.url;
    }

    if (files["imageFile"]) {
      // Dapatkan ekstensi file
      const split = files.imageFile[0].originalname.split(".");
      const extension = split[split.length - 1];

      // Upload file ke imagekit
      const uploadedFile = await imagekit.upload({
        file: files.imageFile[0].buffer,
        fileName: `File-${Date.now()}.${extension}`,
      });

      pas_foto = uploadedFile.url;
    }

    const newPeserta = await Peserta.create({
      ...userBody,
      id_user: req.user.id,
    });

    const newProgramName = "KP/Magang";
    const idProgram = await getProgramId(newProgramName);

    const newPendaftaran = await Pendaftaran.create({
      ...userBody,
      surat_pengantar,
      pas_foto,
      id_peserta: newPeserta.id,
      id_program: idProgram
    });

    res.status(200).json({
      status: "Success add Peserta Pendaftaran",
      data: {
        newPeserta,
        newPendaftaran,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};


// // Fungsi untuk mengunggah file ke ImageKit
// const uploadToImageKit = async (file) => {
//   try {
//     const uploadedFile = await imagekit.upload({
//       file: file.buffer,
//       fileName: file.originalname,
//     });
//     return uploadedFile.url;
//   } catch (error) {
//     throw new ApiError("Gagal mengunggah file ke ImageKit", 500);
//   }
// };

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

// Menampilkan data peserta by status
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


// Menghapus data peserta
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
    addPesertaPendaftar,
    findAllPeserta,
    findPesertaById,
    findDataByStatus,
    deletePeserta
  }