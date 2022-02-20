'use strict';
const { hashPassword } = require('../helpers/bcrypt')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Movie, {
        foreignKey: 'authorId',
        sourceKey: 'id'
      }),
      User.hasMany(models.History, {
        sourceKey: "id",
        foreignKey: "updatedBy"
      })
      User.belongsToMany(models.Movie, {
        through: models.Bookmark,
        foreignKey: "userId"
      })
    }
  };
  User.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: { msg: 'Email is required' },
        notEmpty: { msg: 'Email is required' },
        isEmail: { msg: 'Email Format is invalid!' },
      },
      unique: {
        args: true,
        msg: 'Email address already in use!!'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Password is required' },
        notNull: { msg: 'Password is required' },
        len: {
          args: [5, 24],
          msg: 'Password should be 5 to 24 characters long'
        }
      }
    },
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(async (user, options) => {
    const hashedPassword = await hashPassword(user.password);
    user.password = hashedPassword;
  });


  return User;
};