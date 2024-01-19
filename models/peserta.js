'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Peserta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Peserta.belongsTo(models.User, {
        foreignKey: 'emailUser',
        targetKey: 'email',
        onDelete: 'CASCADE', // Optional: Set the deletion behavior
      });
    }
  }
  Peserta.init({
    nomor_induk: DataTypes.INTEGER,
    nama: DataTypes.STRING,
    alamat: DataTypes.STRING,
    no_whatsapp: DataTypes.STRING,
    tempat_tanggal_lahir: DataTypes.STRING,
    jenis_kelamin: DataTypes.STRING,
    kategori_pendidikan: DataTypes.STRING,
    tingkat_pendidikan: DataTypes.ENUM('Laki-laki', 'Perempuan'),
    institusi: DataTypes.STRING,
    jurusan: DataTypes.STRING,
    program_studi: DataTypes.STRING,
    emailUser: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Peserta',
  });
  return Peserta;
};