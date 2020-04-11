'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`DROP VIEW "KingdomSummaries"`);

    return queryInterface.sequelize.query(`
      CREATE OR REPLACE VIEW "KingdomSummaries"
      AS
      SELECT
        k.id,
        k.name,
        k."lawChaosAlignmentId",
        k."goodEvilAlignmentId",
        (sum(a."economyChange") + "getKingdomAttribute"(k.id, 'economy'))::integer AS "economy",
        (sum(a."loyaltyChange") + "getKingdomAttribute"(k.id, 'loyalty'))::integer AS "loyalty",
        (sum(a."stabilityChange") + "getKingdomAttribute"(k.id, 'stability'))::integer AS "stability",
        sum(a."treasuryChange")::integer AS "treasury",
        sum(a."unrestChange")::integer AS "unrest",
        (count(DISTINCT h.id) + 20)::integer AS "controlDC",
        k."createdAt",
        max(a."updatedAt") AS "updatedAt"
      FROM (("Kingdoms" k
        JOIN "KingdomTurnActions" a ON ((k.id = a."kingdomId")))
        FULL JOIN "Hexes" h ON ((k.id = h."kingdomId")))
      WHERE k.id IS NOT NULL
      GROUP BY k.id
    `);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(`DROP VIEW "KingdomSummaries"`);

    return queryInterface.sequelize.query(`
      CREATE OR REPLACE VIEW "KingdomSummaries"
      AS
      SELECT
        k.id,
        k.name,
        k."lawChaosAlignmentId",
        k."goodEvilAlignmentId",
        sum(a."economyChange") + "getKingdomAttribute"(k.id, 'economy') AS "economy",
        sum(a."loyaltyChange") + "getKingdomAttribute"(k.id, 'loyalty') AS "loyalty",
        sum(a."stabilityChange") + "getKingdomAttribute"(k.id, 'stability') AS "stability",
        sum(a."treasuryChange") AS "treasury",
        sum(a."unrestChange") AS "unrest",
        (count(DISTINCT h.id) + 20) AS "controlDC",
        k."createdAt",
        max(a."updatedAt") AS "updatedAt"
      FROM (("Kingdoms" k
        JOIN "KingdomTurnActions" a ON ((k.id = a."kingdomId")))
        FULL JOIN "Hexes" h ON ((k.id = h."kingdomId")))
      WHERE k.id IS NOT NULL
      GROUP BY k.id
    `);
  }
};
