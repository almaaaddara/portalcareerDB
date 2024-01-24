'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Program extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Program.init({
    nama_program: {
      type: DataTypes.STRING,
      allowNull: false
    },
    deskripsi_program: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    manfaat_program: {
      type: DataTypes.STRING,
      allowNull: false
    },
    syarat_program: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Program',
    indexes: [
      {
        unique: false, // Jika ingin membuat indeks non-unique
        fields: ['manfaat_program'],
      },
      {
        unique: false,
        fields: ['syarat_program'],
      },
    ],
  });
  return Program;
};