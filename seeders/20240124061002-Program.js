'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Programs', [
      {
        nama_program: "KP/Magang",
        deskripsi_program: "Selamat Datang di Portal Career! Portal Career adalah Website Pendaftaran Magang Online untuk memudahkan siswa-siswi SMK dan mahasiswa-mahasiswi dalam mendaftar magang atau kerja praktik (KP) secara online di Rumah Sakit Pertamina Balikpapan.",
        manfaat_program: "Ilmu yang bermanfaat, Sertifikat Magang",
        syarat_program: "Surat Pengantar, Pas Foto 4x6",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Programs', null, {});
  }
};