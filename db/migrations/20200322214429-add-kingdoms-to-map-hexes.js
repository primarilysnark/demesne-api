module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Hexes',
      'kingdomId',
      {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Kingdoms',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
    )
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('Hexes', 'kingdomId')
  }
};
