'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Characters', {
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
      tagline: {
        allowNull: false,
        type: Sequelize.STRING
      },
      strengthModifier: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      dexterityModifier: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      constitutionModifier: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      intelligenceModifier: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      wisdomModifier: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      charismaModifier: {
        allowNull: false,
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
    return queryInterface.dropTable('Characters');
  }
};