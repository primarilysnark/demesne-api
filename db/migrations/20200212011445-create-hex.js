'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Hexes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mapId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Maps',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      column: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      row: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      terrain: {
        allowNull: false,
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Hexes');
  }
};
