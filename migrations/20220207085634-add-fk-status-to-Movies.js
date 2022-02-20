'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Movies", "status", {
      type: Sequelize.STRING,
      defaultValue: "Active"
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Movies", "status")
  }
};
