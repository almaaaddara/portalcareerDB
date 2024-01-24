'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Programs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_program: {
        allowNull: false,
        type: Sequelize.STRING
      },
      deskripsi_program: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      manfaat_program: {
        allowNull: false,
        type: Sequelize.STRING
      },
      syarat_program: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('Programs', 'manfaat_program');
    await queryInterface.removeIndex('Programs', 'syarat_program');
    await queryInterface.dropTable('Programs');
  }
};