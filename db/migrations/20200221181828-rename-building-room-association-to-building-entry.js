'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.renameTable('BuildingRoomAssociations', 'BuildingEntries')
  },

  down: (queryInterface) => {
    return queryInterface.renameTable('BuildingEntries', 'BuildingRoomAssociations')
  }
};
