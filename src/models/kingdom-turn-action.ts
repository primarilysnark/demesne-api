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
  DataType,
  Table
} from 'sequelize-typescript'
import { Kingdom } from './kingdom'
import { KingdomTurnPhase } from '../constants'

@JsonApiSchema('kingdom-turn-actions')
@Table
export class KingdomTurnAction extends JsonApiModel<KingdomTurnAction> {
  @JsonApiIgnore
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public kingdomId!: number

  @JsonApiRelationship(() => Kingdom)
  @BelongsTo(() => Kingdom, 'kingdomId')
  public kingdom!: Kingdom

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public turnNumber!: number

  @AllowNull(false)
  @Column(DataType.ENUM('upkeep', 'edict', 'income', 'event'))
  public phase!: KingdomTurnPhase

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public stepNumber!: number

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public economyChange!: number

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public loyaltyChange!: number

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public stabilityChange!: number

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public treasuryChange!: number

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public unrestChange!: number
}
