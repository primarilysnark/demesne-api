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
import Joi from 'joi'
import { Kingdom } from './kingdom'
import { KingdomTurnPhase } from '../constants'

export const KingdomTurnActionSchema = Joi.object({
  turnNumber: Joi.number()
    .integer()
    .required(),
  phase: Joi.string()
    .valid('upkeep', 'edict', 'income', 'event')
    .required(),
  stepNumber: Joi.number()
    .integer()
    .required(),
  economyChange: Joi.number()
    .integer()
    .required(),
  loyaltyChange: Joi.number()
    .integer()
    .required(),
  stabilityChange: Joi.number()
    .integer()
    .required(),
  treasuryChange: Joi.number()
    .integer()
    .required(),
  unrestChange: Joi.number()
    .integer()
    .required()
})

@JsonApiSchema('actions')
@Table
export class KingdomTurnAction extends JsonApiModel<KingdomTurnAction> {
  @JsonApiIgnore
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    unique: 'turnPhaseStepUnique'
  })
  public kingdomId!: number

  @JsonApiRelationship(() => Kingdom)
  @BelongsTo(() => Kingdom, 'kingdomId')
  public kingdom!: Kingdom

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    unique: 'turnPhaseStepUnique'
  })
  public turnNumber!: number

  @AllowNull(false)
  @Column({
    type: DataType.ENUM('upkeep', 'edict', 'income', 'event'),
    unique: 'turnPhaseStepUnique'
  })
  public phase!: KingdomTurnPhase

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    unique: 'turnPhaseStepUnique'
  })
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
