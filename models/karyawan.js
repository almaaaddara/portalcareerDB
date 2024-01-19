'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Karyawan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Karyawan.belongsTo(models.User, {
        foreignKey: 'emailUser',
        targetKey: 'email',
        onDelete: 'CASCADE', // Optional: Set the deletion behavior
      });
    }
  }
  Karyawan.init({
    NIP: DataTypes.INTEGER,
    nama: DataTypes.STRING,
    alamat: DataTypes.STRING,
    no_whatsapp: DataTypes.STRING,
    emailUser: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Karyawan',
  });
  return Karyawan;
};