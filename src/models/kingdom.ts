import {
  JsonApiModel,
  JsonApiSchema,
  JsonApiRelationship,
  JsonApiIgnore
} from '@primarilysnark/sequelize-json-api'
import {
  AllowNull,
  Column,
  Table,
  BelongsTo,
  DefaultScope,
  DataType,
  HasMany
} from 'sequelize-typescript'
import { Alignment } from './alignment'
import { Character } from './character'
import { KingdomTurnAction } from './kingdom-turn-action'

@DefaultScope({
  include: [
    {
      as: 'lawChaosAxisAlignment',
      model: () => Alignment
    },
    {
      as: 'goodEvilAxisAlignment',
      model: () => Alignment
    },
    {
      as: 'turnActions',
      model: () => KingdomTurnAction
    }
  ]
})
@JsonApiSchema('kingdoms')
@Table
export class Kingdom extends JsonApiModel<Kingdom> {
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

  @JsonApiRelationship(() => KingdomTurnAction)
  @HasMany(() => KingdomTurnAction, 'kingdomId')
  public turnActions!: KingdomTurnAction[]
}
