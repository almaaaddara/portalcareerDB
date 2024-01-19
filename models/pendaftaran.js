'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pendaftaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pendaftaran.belongsTo(models.Program, {
        foreignKey: 'programID',
        onDelete: 'CASCADE',
      });
      Pendaftaran.belongsTo(models.Peserta, {
        foreignKey: 'nomor_induk_peserta',
        onDelete: 'CASCADE',
      });
    }
  }
  Pendaftaran.init({
    // id_pendaftaran: DataTypes.INTEGER,
    durasi_magang: DataTypes.STRING,
    tanggal_mulai: DataTypes.DATE,
    tanggal_selesai: DataTypes.DATE,
    departemen_magang: DataTypes.STRING,
    bidang_minat: DataTypes.STRING,
    status_pendaftaran: {
      type: DataTypes.ENUM('Dikirim', 'Direview', 'Diterima', 'Ditolak'),
      defaultValue: 'Dikirim',
    },
    surat_pengantar: DataTypes.STRING,
    pas_foto: DataTypes.STRING,
    pesan_sekretaris: DataTypes.STRING,
    pesan_sdm: DataTypes.STRING,
    surat_balasan: DataTypes.STRING,
    programID: DataTypes.INTEGER,
    nomor_induk_peserta: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Pendaftaran',
  });
  return Pendaftaran;
};