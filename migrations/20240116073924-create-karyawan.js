'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Karyawans', {
      // id: {
      //   allowNull: false,
      //   autoIncrement: false,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER
      // },
      NIP: {
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
    await queryInterface.dropTable('Karyawans');
  }
};