'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pendaftarans', {
      id_pendaftaran: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // id_pendaftaran: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER
      // },
      durasi_magang: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tanggal_mulai: {
        allowNull: false,
        type: Sequelize.DATE
      },
      tanggal_selesai: {
        allowNull: false,
        type: Sequelize.DATE
      },
      departemen_magang: {
        allowNull: false,
        type: Sequelize.STRING
      },
      bidang_minat: {
        allowNull: false,
        type: Sequelize.STRING
      },
      status_pendaftaran: {
        allowNull: false,
        type: Sequelize.ENUM('Dikirim', 'Direview', 'Diterima', 'Ditolak'),
        defaultValue : "Dikirim"
      },
      surat_pengantar: {
        allowNull: false,
        type: Sequelize.STRING
      },
      pas_foto: {
        allowNull: false,
        type: Sequelize.STRING
      },
      pesan_sekretaris: {
        allowNull: true,
        type: Sequelize.STRING
      },
      pesan_sdm: {
        allowNull: true,
        type: Sequelize.STRING
      },
      surat_balasan: {
        allowNull: false,
        type: Sequelize.STRING
      },
      programID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Programs',
          key: 'id_program',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      nomor_induk_peserta: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Peserta',
          key: 'nomor_induk',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      // createdAt: {
      //   allowNull: false,
      //   type: Sequelize.DATE
      // },
      // updatedAt: {
      //   allowNull: false,
      //   type: Sequelize.DATE
      // }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Pendaftarans');
  }
};