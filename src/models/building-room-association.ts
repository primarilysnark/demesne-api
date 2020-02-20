import {
  AllowNull,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript'

enum EarningAllocation {
  Goods,
  Influence,
  Labor,
  Magic,
  Gp
}

@Table
export class BuildingRoomAssociation extends Model<BuildingRoomAssociation> {
  @AllowNull(false)
  @PrimaryKey
  @Column({
    onDelete: 'cascade',
    onUpdate: 'cascade',
    references: {
      key: 'id',
      model: 'Buildings'
    },
    type: DataType.INTEGER,
    unique: 'building_room_association'
  })
  public buildingId!: number

  @AllowNull(false)
  @PrimaryKey
  @Column({
    onDelete: 'cascade',
    onUpdate: 'cascade',
    references: {
      key: 'sub',
      model: 'Room'
    },
    type: DataType.INTEGER,
    unique: 'building_room_association'
  })
  public roomId!: string

  @Column(DataType.ENUM('goods', 'influence', 'labor', 'magic', 'gp'))
  public earningAllocation!: EarningAllocation
}
