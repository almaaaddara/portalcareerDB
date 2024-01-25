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
        foreignKey: 'id_program',
        onDelete: 'CASCADE',
      });
      Pendaftaran.belongsTo(models.Peserta, {
        foreignKey: 'id_peserta',
        onDelete: 'CASCADE',
      });
    }
  }
  Pendaftaran.init({
    durasi_magang: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tanggal_mulai: {
      type: DataTypes.DATE,
      allowNull: false
    },
    tanggal_selesai: {
      type: DataTypes.DATE,
      allowNull: false
    },
    departemen_magang: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bidang_minat: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status_pendaftaran: {
      type: DataTypes.ENUM('Dikirim', 'Direview', 'Diterima', 'Ditolak', 'Selesai'),
      defaultValue: 'Dikirim',
    },
    surat_pengantar: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pas_foto: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pesan_sekretaris: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pesan_sdm: {
      type: DataTypes.STRING,
      allowNull: true
    },
    surat_balasan: {
      type: DataTypes.STRING,
      allowNull: true
    },
    id_program: DataTypes.INTEGER,
    id_peserta: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Pendaftaran',
  });
  return Pendaftaran;
};