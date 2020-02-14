import { JsonApiModel, JsonApiSchema } from '@primarilysnark/sequelize-json-api'
import { AllowNull, Column, Table } from 'sequelize-typescript'

@JsonApiSchema('maps')
@Table
export class Map extends JsonApiModel<Map> {
  @AllowNull(false)
  @Column
  public name!: string
}
