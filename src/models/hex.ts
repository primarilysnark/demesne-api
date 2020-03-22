import { JsonApiModel, JsonApiSchema } from '@primarilysnark/sequelize-json-api'
import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Table
} from 'sequelize-typescript'
import { Map } from './map'
import { Kingdom } from './kingdom'

@JsonApiSchema('hexes')
@Table
export class Hex extends JsonApiModel<Hex> {
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public column!: number

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public row!: number

  @AllowNull(false)
  @Column
  public terrain!: string

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public mapId!: number

  @Column(DataType.INTEGER)
  public kingdomId: number

  @BelongsTo(() => Map, 'mapId')
  public map!: Map

  @BelongsTo(() => Kingdom, 'kingdomId')
  public kingdom: Kingdom
}
