'use strict';
const {
  Model, DataTypes
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
        foreignKey: 'id_user',
        targetKey: 'id',
        allowNull: 'false',
        onDelete: 'CASCADE', // Optional: Set the deletion behavior
      });

      Peserta.hasMany(models.Pendaftaran, {
        foreignKey: 'id_peserta',
        targetKey: 'id',
        allowNull: 'false',
        onDelete: 'CASCADE', // Optional: Set the deletion behavior
      });
    }
  }
  Peserta.init({
    nomor_induk: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false
    },
    alamat: {
      type: DataTypes.STRING,
      allowNull: false
    },
    no_whatsapp: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tempat_tanggal_lahir: {
      type: DataTypes.STRING,
      allowNull: false
    },
    jenis_kelamin: {
      allowNull: false,
      type: DataTypes.ENUM("Laki-Laki", "Perempuan"),
      defaultValue: "Laki-Laki"
    },
    kategori_pendidikan: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tingkat_pendidikan: {
      type: DataTypes.STRING,
      allowNull: false
    },
    institusi: {
      type: DataTypes.STRING,
      allowNull: false
    },
    jurusan: {
      type: DataTypes.STRING,
      allowNull: false
    },
    program_studi: {
      type: DataTypes.STRING,
      allowNull: true
    },
    id_user: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Peserta',
  });
  return Peserta;
};