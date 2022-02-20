'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      History.belongsTo(models.User, {
        foreignKey: "updatedBy",
        targetKey: "id",
      })
    }
  };
  History.init({
    entityId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    updatedBy: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};