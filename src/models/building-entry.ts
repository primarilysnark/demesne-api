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
  PrimaryKey,
  Table
} from 'sequelize-typescript'
import { Building } from './building'
import { Room } from './room'

enum EarningAllocation {
  Goods,
  Influence,
  Labor,
  Magic,
  Gp
}

@DefaultScope({
  include: [
    {
      as: 'room',
      model: () => Room
    }
  ]
})
@JsonApiSchema('building-entries')
@Table
export class BuildingEntry extends JsonApiModel<BuildingEntry> {
  @AllowNull(false)
  @PrimaryKey
  @Column(DataType.INTEGER)
  public id!: number

  @JsonApiIgnore
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public buildingId!: number

  @JsonApiIgnore
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public roomId!: number

  @BelongsTo(() => Building, 'id')
  public building: Building

  @JsonApiRelationship(Room)
  @BelongsTo(() => Room, 'roomId')
  public room: Room

  @Column(DataType.ENUM('goods', 'influence', 'labor', 'magic', 'gp'))
  public earningAllocation!: EarningAllocation
}
