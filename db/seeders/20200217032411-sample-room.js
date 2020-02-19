module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'Rooms',
      [
        {
          name: 'Alchemy Lab',
          description: "This room aids you when you're attempting Craft (alchemy) checks, researching new alchemist formulae, and performing similar alchemical tasks. Up to three people can use the room at a time.",
          benefit: "counts as an alchemist's lab (equipment)",
          minimumSize: 8,
          maximumSize: 16,
          bonus: 10,
          earnGoods: true,
          earnInfluence: false,
          earnLabor: false,
          earnMagic: true,
          earnGp: true,
          costGoods: 8,
          costInfluence: 1,
          costLabor: 5,
          costMagic: 1
        }
      ]
    )
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Rooms', {})
  }
};
