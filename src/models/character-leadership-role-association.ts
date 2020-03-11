import {
  JsonApiRelationship,
  JsonApiSchema,
  JsonApiModel,
  JsonApiIgnore
} from '@primarilysnark/sequelize-json-api'
import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  DefaultScope,
  Table
} from 'sequelize-typescript'
import { AbilityScore } from '../constants'
import { Character } from './character'
import { LeadershipRole } from './leadership-role'
import { Kingdom } from './kingdom'

enum KingdomAttribute {
  Economy = 'economy',
  Loyalty = 'loyalty',
  Stability = 'stability'
}

@DefaultScope({
  include: [
    {
      as: 'leadershipRole',
      model: () => LeadershipRole
    }
  ]
})
@JsonApiSchema('leadership-roles')
@Table
export class CharacterLeadershipRoleAssociation extends JsonApiModel<
  CharacterLeadershipRoleAssociation
> {
  @JsonApiIgnore
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    references: {
      model: 'Characters',
      key: 'id'
    },
    onUpdate: 'cascade',
    onDelete: 'cascade'
  })
  public characterId!: number

  @JsonApiIgnore
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    references: {
      model: 'LeadershipRoles',
      key: 'id'
    },
    onUpdate: 'cascade',
    onDelete: 'cascade'
  })
  public leadershipRoleId!: number

  @JsonApiIgnore
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    references: {
      model: 'Kingdoms',
      key: 'id'
    },
    onUpdate: 'cascade',
    onDelete: 'cascade'
  })
  public kingdomId!: number

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public assignedTurn!: number

  @Column(DataType.INTEGER)
  public vacatedTurn: number

  @AllowNull(false)
  @Column(
    DataType.ENUM(
      'strength',
      'dexterity',
      'constitution',
      'intelligence',
      'wisdom',
      'charisma'
    )
  )
  public selectedAbilityScore: AbilityScore

  @AllowNull(false)
  @Column(DataType.ARRAY(DataType.ENUM('economy', 'loyalty', 'stability')))
  public selectedKingdomAttributes!: KingdomAttribute[]

  @JsonApiRelationship(() => Character)
  @BelongsTo(() => Character, 'characterId')
  public character!: Character

  @JsonApiRelationship(() => LeadershipRole)
  @BelongsTo(() => LeadershipRole, 'leadershipRoleId')
  public leadershipRole!: LeadershipRole

  @JsonApiRelationship(() => Kingdom)
  @BelongsTo(() => Kingdom, 'kingdomId')
  public kingdom!: Kingdom
}
