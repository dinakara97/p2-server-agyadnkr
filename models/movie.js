'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {

    static associate(models) {
      Movie.belongsTo(models.Genre, {
        foreignKey: 'genreId',
        targetKey: 'id'
      })
      Movie.belongsTo(models.User, {
        foreignKey: 'authorId',
        targetKey: 'id'
      })
      Movie.belongsToMany(models.User, {
        through: models.Bookmark,
        foreignKey: "movieId"
      })
    }
  };
  Movie.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Title is required' },
        notNull: { msg: 'Title is required' }
      }
    },
    synopsis: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Synopsis is required' },
        notNull: { msg: 'Synopsis is required' },
      }
    },
    trailerUrl: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [1],
          msg: 'Minimum rating is 1 star'
        },
        max: {
          args: [10],
          msg: 'Maximum rating is 10 star'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Active"
    },
    genreId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};