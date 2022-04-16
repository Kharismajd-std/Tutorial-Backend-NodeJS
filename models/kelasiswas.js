'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KelaSiswas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  KelaSiswas.init({
    idSiswa: DataTypes.INTEGER,
    idKelas: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'KelaSiswas',
  });
  return KelaSiswas;
};