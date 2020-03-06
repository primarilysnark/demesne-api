'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    function transformAbilityScores(scores) {
      return Sequelize.literal(`ARRAY[${scores.map(score => `'${score}'`).join(', ')}]::"enum_LeadershipRoles_recommendedAbilityScores"[]`)
    }

    return queryInterface.bulkInsert(
      'LeadershipRoles',
      [
        {
          name: 'Ruler',
          recommendedAbilityScores: transformAbilityScores(['charisma']),
          applyToAllAttributes: false,
          applyToAllAttributesWithSizeGate: true,
          applyHalfAbilityScoreModifier: false,
          economy: true,
          loyalty: true,
          stability: true
        },
        {
          name: 'Consort',
          recommendedAbilityScores: transformAbilityScores(['charisma']),
          applyToAllAttributes: true,
          applyToAllAttributesWithSizeGate: false,
          applyHalfAbilityScoreModifier: true,
          economy: false,
          loyalty: true,
          stability: false
        },
        {
          name: 'Councilor',
          recommendedAbilityScores: transformAbilityScores(['wisdom', 'charisma']),
          applyToAllAttributes: true,
          applyToAllAttributesWithSizeGate: false,
          applyHalfAbilityScoreModifier: false,
          economy: false,
          loyalty: true,
          stability: false
        },
        {
          name: 'General',
          recommendedAbilityScores: transformAbilityScores(['strength', 'charisma']),
          applyToAllAttributes: true,
          applyToAllAttributesWithSizeGate: false,
          applyHalfAbilityScoreModifier: false,
          economy: false,
          loyalty: false,
          stability: true
        },
        {
          name: 'Grand Diplomat',
          recommendedAbilityScores: transformAbilityScores(['intelligence', 'charisma']),
          applyToAllAttributes: true,
          applyToAllAttributesWithSizeGate: false,
          applyHalfAbilityScoreModifier: false,
          economy: false,
          loyalty: false,
          stability: true
        },
        {
          name: 'Heir',
          recommendedAbilityScores: transformAbilityScores(['charisma']),
          applyToAllAttributes: true,
          applyToAllAttributesWithSizeGate: false,
          applyHalfAbilityScoreModifier: true,
          economy: false,
          loyalty: true,
          stability: false
        },
        {
          name: 'High Priest',
          recommendedAbilityScores: transformAbilityScores(['wisdom', 'charisma']),
          applyToAllAttributes: true,
          applyToAllAttributesWithSizeGate: false,
          applyHalfAbilityScoreModifier: false,
          economy: false,
          loyalty: false,
          stability: true
        },
        {
          name: 'Magister',
          recommendedAbilityScores: transformAbilityScores(['intelligence', 'charisma']),
          applyToAllAttributes: true,
          applyToAllAttributesWithSizeGate: false,
          applyHalfAbilityScoreModifier: false,
          economy: true,
          loyalty: false,
          stability: false
        },
        {
          name: 'Marshal',
          recommendedAbilityScores: transformAbilityScores(['dexterity', 'wisdom']),
          applyToAllAttributes: true,
          applyToAllAttributesWithSizeGate: false,
          applyHalfAbilityScoreModifier: false,
          economy: true,
          loyalty: false,
          stability: false
        },
        {
          name: 'Royal Enforcer',
          recommendedAbilityScores: transformAbilityScores(['dexterity', 'strength']),
          applyToAllAttributes: true,
          applyToAllAttributesWithSizeGate: false,
          applyHalfAbilityScoreModifier: false,
          economy: false,
          loyalty: true,
          stability: false
        },
        {
          name: 'Spy Master',
          recommendedAbilityScores: transformAbilityScores(['dexterity', 'intelligence']),
          applyToAllAttributes: false,
          applyToAllAttributesWithSizeGate: false,
          applyHalfAbilityScoreModifier: false,
          economy: true,
          loyalty: true,
          stability: true
        },
        {
          name: 'Treasurer',
          recommendedAbilityScores: transformAbilityScores(['intelligence', 'wisdom']),
          applyToAllAttributes: true,
          applyToAllAttributesWithSizeGate: false,
          applyHalfAbilityScoreModifier: false,
          economy: true,
          loyalty: false,
          stability: false
        },
        {
          name: 'Viceroy',
          recommendedAbilityScores: transformAbilityScores(['intelligence', 'wisdom']),
          applyToAllAttributes: true,
          applyToAllAttributesWithSizeGate: false,
          applyHalfAbilityScoreModifier: true,
          economy: true,
          loyalty: false,
          stability: false
        },
        {
          name: 'Warden',
          recommendedAbilityScores: transformAbilityScores(['strength', 'constitution']),
          applyToAllAttributes: true,
          applyToAllAttributesWithSizeGate: false,
          applyHalfAbilityScoreModifier: false,
          economy: false,
          loyalty: true,
          stability: false
        }
      ]
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('LeadershipRoles', {})
  }
};
