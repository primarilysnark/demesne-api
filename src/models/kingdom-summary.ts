import {
  JsonApiIgnore,
  JsonApiModel,
  JsonApiRelationship,
  JsonApiSchema
} from '@primarilysnark/sequelize-json-api'
import {
  AllowNull,
  BelongsTo,
  Column,
  DefaultScope,
  DataType,
  HasMany,
  Table
} from 'sequelize-typescript'
import { Alignment } from './alignment'
import { Character } from './character'

@DefaultScope({
  include: [
    {
      as: 'lawChaosAxisAlignment',
      model: () => Alignment
    },
    {
      as: 'goodEvilAxisAlignment',
      model: () => Alignment
    }
  ]
})
@JsonApiSchema('kingdom-summaries')
@Table
export class KingdomSummary extends JsonApiModel<KingdomSummary> {
  @AllowNull(false)
  @Column
  public name!: string

  @JsonApiIgnore
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public lawChaosAlignmentId!: number

  @JsonApiIgnore
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public goodEvilAlignmentId!: number

  @JsonApiRelationship(() => Alignment)
  @BelongsTo(() => Alignment, 'lawChaosAlignmentId')
  public lawChaosAxisAlignment: Alignment

  @JsonApiRelationship(() => Alignment)
  @BelongsTo(() => Alignment, 'goodEvilAlignmentId')
  public goodEvilAxisAlignment: Alignment

  @JsonApiRelationship(() => Character)
  @HasMany(() => Character, 'kingdomId')
  public characters!: Character[]

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public economy!: number

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public loyalty!: number

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public stability!: number

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public treasury!: number

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public unrest!: number
}
