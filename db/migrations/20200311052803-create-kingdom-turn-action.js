'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('KingdomTurnActions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      kingdomId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Kingdoms',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      turnNumber: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      phase: {
        allowNull: false,
        type: Sequelize.ENUM('upkeep', 'edict', 'income', 'event')
      },
      stepNumber: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      economyChange: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      loyaltyChange: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      stabilityChange: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      treasuryChange: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      unrestChange: {
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
    return queryInterface.dropTable('KingdomTurnActions');
  }
};