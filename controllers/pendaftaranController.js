const { Peserta, Pendaftaran, Program } = require("../models")
const ApiError = require("../utils/apiError")
const Sequelize = require("sequelize")
const Op = Sequelize.Op

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
            program_studi,
            durasi_magang,
            tanggal_mulai,
            tanggal_selesai,
            departemen_magang,
            bidang_minat,
            status_pendaftaran,
            surat_pengantar,
            pas_foto,
            pesan_sekretaris,
            pesan_sdm,
            surat_balasan
        } = req.body
        
        const thisPesertaPendaftar = await Peserta.findOne({
            where: {nomor_induk}
        })
        if (thisPesertaPendaftar) {
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
        });

        const newProgramName = "KP/Magang";
        const idProgram = await getProgramId(newProgramName);

        const newPendaftaran = await Pendaftaran.create({
            durasi_magang,
            tanggal_mulai,
            tanggal_selesai,
            departemen_magang,
            bidang_minat,
            status_pendaftaran,
            surat_pengantar,
            pas_foto,
            pesan_sekretaris,
            pesan_sdm,
            surat_balasan,
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

module.exports = {
    addPesertaPendaftar
};