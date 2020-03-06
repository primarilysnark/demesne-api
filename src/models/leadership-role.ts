import { JsonApiModel, JsonApiSchema } from '@primarilysnark/sequelize-json-api'
import { AllowNull, Column, Table, DataType } from 'sequelize-typescript'

enum AbilityScore {
  Strength = 'strength',
  Dexterity = 'dexterity',
  Constitution = 'constitution',
  Intelligence = 'intelligence',
  Wisdom = 'wisdom',
  Charisma = 'charisma'
}

@JsonApiSchema('leadership-roles')
@Table
export class LeadershipRole extends JsonApiModel<LeadershipRole> {
  @AllowNull(false)
  @Column
  public name!: string

  @AllowNull(false)
  @Column(
    DataType.ARRAY(
      DataType.ENUM(
        'strength',
        'dexterity',
        'constitution',
        'intelligence',
        'wisdom',
        'charisma'
      )
    )
  )
  recommendedAbilityScores!: AbilityScore[]

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  applyToAllAttributes!: boolean

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  applyToAllAttributesWithSizeGate!: boolean

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  applyHalfAbilityScoreModifier!: boolean

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  public economy!: boolean

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  public loyalty!: boolean

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  public stability!: boolean
}
