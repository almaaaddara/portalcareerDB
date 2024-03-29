'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Peserta, {
        foreignKey: 'id_user',
        targetKey: 'id',
        allowNull: 'false',
        onDelete: 'CASCADE',
      })
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("peserta", "sdm", "sekretaris"),
      defaultValue: "peserta",
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};