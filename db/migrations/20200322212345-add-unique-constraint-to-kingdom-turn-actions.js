module.exports = {
  up: (queryInterface) => {
    return queryInterface.addConstraint(
      'KingdomTurnActions',
      ['kingdomId', 'turnNumber', 'phase', 'stepNumber'],
      {
        type: 'unique',
        name: 'turnPhaseStepUnique'
      }
    );
  },

  down: (queryInterface) => {
    return queryInterface.removeConstraint('KingdomTurnActions', 'turnPhaseStepUnique')
  }
};
