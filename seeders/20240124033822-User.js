'use strict';
const {User} = require("../models")
const bcrypt = require('bcrypt');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Generate hashed password using bcrypt
    const hashedPassword1 = await bcrypt.hash('sekretarisrspb', 10);
    const hashedPassword2 = await bcrypt.hash('sdmrspb', 10);

    // Add seed data for user role 'sekretaris' and 'sdm'
    return queryInterface.bulkInsert('Users', [
      {
        email: 'sekretaris@gmail.com',
        password: hashedPassword1,
        role: 'sekretaris',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'sdm@gmail.com',
        password: hashedPassword2,
        role: 'sdm',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
