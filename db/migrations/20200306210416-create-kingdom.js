'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Kingdoms', {
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
      lawChaosAlignmentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Alignments',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      goodEvilAlignmentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Alignments',
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
    return queryInterface.dropTable('Kingdoms');
  }
};