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
  Table
} from 'sequelize-typescript'
import { Kingdom } from './kingdom'

@DefaultScope({
  include: [
    {
      as: 'kingdom',
      model: () => Kingdom
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

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public strengthModifier!: number

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public dexterityModifier!: number

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public constitutionModifier!: number

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public intelligenceModifier!: number

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public wisdomModifier!: number

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public charismaModifier!: number

  @JsonApiIgnore
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public kingdomId!: number

  @JsonApiRelationship(Kingdom)
  @BelongsTo(() => Kingdom, 'kingdomId')
  public kingdom!: Kingdom
}
