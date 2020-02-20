import {
  JsonApiMeta,
  JsonApiModel,
  JsonApiSchema
} from '@primarilysnark/sequelize-json-api'
import {
  AllowNull,
  Column,
  DefaultScope,
  Table,
  BelongsToMany
} from 'sequelize-typescript'
import { BuildingRoomAssociation } from './building-room-association'
import { Room } from './room'

@DefaultScope({
  include: [
    {
      as: 'rooms',
      model: () => Room
    }
  ]
})
@JsonApiSchema('buildings')
@Table
export class Building extends JsonApiModel<Building> {
  @AllowNull(false)
  @Column
  public name!: string

  @JsonApiMeta('allocation', 'earningAllocation')
  @BelongsToMany(
    () => Room,
    () => BuildingRoomAssociation,
    'buildingId',
    'roomId'
  )
  public rooms: Room[]
}
