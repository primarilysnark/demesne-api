'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Rooms', {
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
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      benefit: {
        type: Sequelize.STRING
      },
      minimumSize: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      maximumSize: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      bonus: {
        type: Sequelize.INTEGER
      },
      earnGoods: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      earnInfluence: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      earnLabor: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      earnMagic: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      earnGp: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      costGoods: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      costInfluence: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      costLabor: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      costMagic: {
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
    return queryInterface.dropTable('Rooms');
  }
};