import {
  JsonApiModel,
  JsonApiSchema,
  JsonApiIgnore,
  JsonApiRelationship
} from '@primarilysnark/sequelize-json-api'
import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  DefaultScope,
  Table,
  HasOne
} from 'sequelize-typescript'
import { Kingdom } from './kingdom'
import { CharacterLeadershipRoleAssociation } from './character-leadership-role-association'

interface ICharacterAbilityScoreModifiers {
  strength: number
  dexterity: number
  constitution: number
  intelligence: number
  wisdom: number
  charisma: number
}

@DefaultScope({
  include: [
    {
      as: 'kingdom',
      model: () => Kingdom
    },
    {
      as: 'leadershipAssignment',
      model: () => CharacterLeadershipRoleAssociation
    }
  ]
})
@JsonApiSchema('characters')
@Table
export class Character extends JsonApiModel<Character> {
  @AllowNull(false)
  @Column
  public name!: string

  @AllowNull(false)
  @Column
  public tagline!: string

  @JsonApiIgnore
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public strengthModifier!: number

  @JsonApiIgnore
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public dexterityModifier!: number

  @JsonApiIgnore
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public constitutionModifier!: number

  @JsonApiIgnore
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public intelligenceModifier!: number

  @JsonApiIgnore
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public wisdomModifier!: number

  @JsonApiIgnore
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public charismaModifier!: number

  @JsonApiIgnore
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public kingdomId!: number

  @JsonApiRelationship(() => Kingdom)
  @BelongsTo(() => Kingdom, 'kingdomId')
  public kingdom!: Kingdom

  @JsonApiRelationship(
    () => CharacterLeadershipRoleAssociation,
    'leadershipRole',
    {
      assignedTurn: 'assignedTurn',
      selectedAbilityScore: 'selectedAbilityScore',
      selectedKingdomAttributes: 'selectedKingdomAttributes',
      vacatedTurn: 'vacatedTurn'
    }
  )
  @HasOne(() => CharacterLeadershipRoleAssociation, 'characterId')
  public leadershipAssignment!: CharacterLeadershipRoleAssociation

  public get abilityScoreModifiers(): ICharacterAbilityScoreModifiers {
    return {
      strength: this.getDataValue('strengthModifier'),
      dexterity: this.getDataValue('dexterityModifier'),
      constitution: this.getDataValue('constitutionModifier'),
      intelligence: this.getDataValue('intelligenceModifier'),
      wisdom: this.getDataValue('wisdomModifier'),
      charisma: this.getDataValue('charismaModifier')
    }
  }
}
