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
  @JsonApiIgnore
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    references: {
      model: 'Buildings',
      key: 'id'
    },
    onUpdate: 'cascade',
    onDelete: 'cascade'
  })
  public buildingId!: number

  @JsonApiIgnore
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public roomId!: number

  @JsonApiRelationship(Room)
  @BelongsTo(() => Room, 'roomId')
  public room: Room

  @Column(DataType.ENUM('goods', 'influence', 'labor', 'magic', 'gp'))
  public earningAllocation!: EarningAllocation
}
