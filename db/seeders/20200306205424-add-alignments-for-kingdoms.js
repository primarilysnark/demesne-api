'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Alignments',
      [
        {
          name: 'Chaotic',
          isLawChaosAxis: true,
          isGoodEvilAxis: false,
          economy: 0,
          loyalty: 2,
          stability: 0
        },
        {
          name: 'Evil',
          isLawChaosAxis: false,
          isGoodEvilAxis: true,
          economy: 2,
          loyalty: 0,
          stability: 0
        },
        {
          name: 'Good',
          isLawChaosAxis: false,
          isGoodEvilAxis: true,
          economy: 0,
          loyalty: 2,
          stability: 0
        },
        {
          name: 'Lawful',
          isLawChaosAxis: true,
          isGoodEvilAxis: false,
          economy: 2,
          loyalty: 0,
          stability: 0
        },
        {
          name: 'Neutral',
          isLawChaosAxis: true,
          isGoodEvilAxis: true,
          economy: 0,
          loyalty: 0,
          stability: 2
        }
      ]
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Alignments', {})
  }
};
