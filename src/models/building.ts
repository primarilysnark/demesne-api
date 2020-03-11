import {
  JsonApiModel,
  JsonApiRelationship,
  JsonApiSchema
} from '@primarilysnark/sequelize-json-api'
import {
  AllowNull,
  Column,
  DefaultScope,
  HasMany,
  Table
} from 'sequelize-typescript'
import { BuildingEntry } from './building-entry'

@DefaultScope({
  include: [
    {
      as: 'buildingEntries',
      model: () => BuildingEntry
    }
  ]
})
@JsonApiSchema('buildings')
@Table
export class Building extends JsonApiModel<Building> {
  @AllowNull(false)
  @Column
  public name!: string

  @JsonApiRelationship(() => BuildingEntry, {
    allocation: 'earningAllocation'
  })
  @HasMany(() => BuildingEntry, 'buildingId')
  public buildingEntries: BuildingEntry[]
}
