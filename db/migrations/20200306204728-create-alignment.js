'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Alignments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      isLawChaosAxis: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      isGoodEvilAxis: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      economy: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      loyalty: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      stability: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Alignments');
  }
};