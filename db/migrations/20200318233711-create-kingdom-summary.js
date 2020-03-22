module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION "getKingdomAttribute"(selectedkingdomid integer, attribute character varying)
        RETURNS integer
        LANGUAGE plpgsql
        IMMUTABLE
      AS $function$
      DECLARE total int;
      BEGIN
        SELECT
          SUM(
            CASE WHEN clra."selectedAbilityScore" = 'strength'::"enum_CharacterLeadershipRoleAssociations_selectedAbilityScore"
                THEN c."strengthModifier"
              WHEN clra."selectedAbilityScore" = 'dexterity'::"enum_CharacterLeadershipRoleAssociations_selectedAbilityScore"
                THEN c."dexterityModifier"
              WHEN clra."selectedAbilityScore" = 'constitution'::"enum_CharacterLeadershipRoleAssociations_selectedAbilityScore"
                THEN c."constitutionModifier"
              WHEN clra."selectedAbilityScore" = 'intelligence'::"enum_CharacterLeadershipRoleAssociations_selectedAbilityScore"
                THEN c."intelligenceModifier"
              WHEN clra."selectedAbilityScore" = 'wisdom'::"enum_CharacterLeadershipRoleAssociations_selectedAbilityScore"
                THEN c."wisdomModifier"
              WHEN clra."selectedAbilityScore" = 'charisma'::"enum_CharacterLeadershipRoleAssociations_selectedAbilityScore"
                THEN c."charismaModifier"
              ELSE 0
            END
          ) INTO total
        FROM
          "Kingdoms" k
            JOIN "CharacterLeadershipRoleAssociations" clra ON k."id" = clra."kingdomId"
            JOIN "Characters" c ON c."id" = clra."characterId"
        WHERE
          k."id" = selectedKingdomId AND
          clra."selectedKingdomAttributes" @> CONCAT('{', attribute, '}')::"enum_CharacterLeadershipRoleAssociations_selectedKingdomAttribu"[]
        GROUP BY k."id";
        RETURN total;
      END;
      $function$
    `);

    await queryInterface.sequelize.query(`
      CREATE VIEW "KingdomSummaries"
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
        k."createdAt",
        max(a."updatedAt") AS "updatedAt"
      FROM ("Kingdoms" k
      JOIN "KingdomTurnActions" a ON ((k.id = a."kingdomId")))
      GROUP BY k.id
    `);
  },
  down: (queryInterface) => {
    return queryInterface.sequelize.query(`
      DROP VIEW "KingdomSummaries";
      DROP FUNCTION "getKingdomAttribute"(integer, character varying);
    `);
  }
};
