import { JsonApiModel, JsonApiSchema } from '@primarilysnark/sequelize-json-api'
import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Table,
  HasOne
} from 'sequelize-typescript'
import { Map } from './map'

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

  @BelongsTo(() => Map, 'mapId')
  public map!: Map
}
