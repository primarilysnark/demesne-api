'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CharacterLeadershipRoleAssociations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      characterId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Characters',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      leadershipRoleId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'LeadershipRoles',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
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
      assignedTurn: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      vacatedTurn: {
        type: Sequelize.INTEGER
      },
      selectedAbilityScore: {
        allowNull: false,
        type: Sequelize.ENUM('strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma')
      },
      selectedKingdomAttributes: {
        allowNull: false,
        type: Sequelize.ARRAY(
          Sequelize.ENUM('economy', 'loyalty', 'stability')
        )
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
    return queryInterface.dropTable('CharacterLeadershipRoleAssociations');
  }
};