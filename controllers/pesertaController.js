const { Peserta, Pendaftaran, Program } = require("../models")
const ApiError = require("../utils/apiError")
const Sequelize = require("sequelize")
const imagekit = require("../libs/imagekit")
const Op = Sequelize.Op

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
      // const {
      //     nomor_induk, 
      //     nama, 
      //     alamat, 
      //     no_whatsapp, 
      //     tempat_tanggal_lahir, 
      //     jenis_kelamin, 
      //     kategori_pendidikan, 
      //     tingkat_pendidikan, 
      //     institusi, 
      //     jurusan, 
      //     program_studi,
      //     durasi_magang,
      //     tanggal_mulai,
      //     tanggal_selesai,
      //     departemen_magang,
      //     bidang_minat,
      //     status_pendaftaran,
      //     surat_pengantar,
      //     pas_foto,
      // } = req.body
      const userBody = req.body;
      
      // const thisPesertaPendaftar = await Peserta.findOne({
      //     where: {nomor_induk}
      // })
      // if (thisPesertaPendaftar) {
      //     return next(new ApiError("Nomor induk telah terdaftar", 400))
      // }
// surat_pengantar_URL,
      const { file } = req
      let pas_foto;
      if (file) {
          // dapatkan extension file nya
          const split = file.originalname.split(".")
          const extension = split[split.length - 1]

          // upload file ke imagekit
          const uploadedFile = await imagekit.upload({
              file: file.buffer,
              fileName: `File-${Date.now()}.${extension}`
          })

          pas_foto = uploadedFile.url
          
          // if (file.fieldname === 'surat_pengantar') {
          //     surat_pengantar_URL = uploadedFile.url;
          // } else if (file.fieldname === 'pas_foto') {
          //     pas_foto_URL = uploadedFile.url;
          // }
      }

      const newPeserta = await Peserta.create({
          // nomor_induk, 
          // nama, 
          // alamat, 
          // no_whatsapp, 
          // tempat_tanggal_lahir, 
          // jenis_kelamin, 
          // kategori_pendidikan, 
          // tingkat_pendidikan, 
          // institusi, 
          // jurusan, 
          // program_studi,
          ...userBody,
          id_user: req.user.id,
      });

      const newProgramName = "KP/Magang";
      const idProgram = await getProgramId(newProgramName);

      const newPendaftaran = await Pendaftaran.create({
          // durasi_magang,
          // tanggal_mulai,
          // tanggal_selesai,
          // departemen_magang,
          // bidang_minat,
          // status_pendaftaran,
          ...userBody,
          surat_pengantar: "surat_pengantar_URL",
          pas_foto,
          id_peserta: newPeserta.id,
          id_program: idProgram
      })

      res.status(200).json({
          status: "Success add Peserta Pendaftaran",
          data: {
            newPeserta,
            newPendaftaran
          }
        })
  } catch (err) {
      next(new ApiError(err.message, 500))
  }
}

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