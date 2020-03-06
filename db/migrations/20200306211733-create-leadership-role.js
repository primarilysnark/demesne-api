'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('LeadershipRoles', {
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
      recommendedAbilityScores: {
        allowNull: false,
        type: Sequelize.ARRAY(
          Sequelize.ENUM('strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma')
        )
      },
      applyToAllAttributes: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      applyToAllAttributesWithSizeGate: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      applyHalfAbilityScoreModifier: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      economy: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      loyalty: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      stability: {
        allowNull: false,
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('LeadershipRoles');
  }
};