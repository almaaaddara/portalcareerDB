'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Peserta', {
      // id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER
      // },
      nomor_induk: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        allowNull: false,
        type: Sequelize.STRING
      },
      alamat: {
        allowNull: false,
        type: Sequelize.STRING
      },
      no_whatsapp: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tempat_tanggal_lahir: {
        allowNull: false,
        type: Sequelize.STRING
      },
      jenis_kelamin: {
        allowNull: false,
        type: Sequelize.ENUM('Laki-laki', 'Perempuan')
      },
      kategori_pendidikan: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tingkat_pendidikan: {
        allowNull: false,
        type: Sequelize.STRING
      },
      institusi: {
        allowNull: false,
        type: Sequelize.STRING
      },
      jurusan: {
        allowNull: false,
        type: Sequelize.STRING
      },
      program_studi: {
        allowNull: true,
        type: Sequelize.STRING
      },
      emailUser: {
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'email',
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
    await queryInterface.dropTable('Peserta');
  }
};