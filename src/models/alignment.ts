import { JsonApiModel, JsonApiSchema } from '@primarilysnark/sequelize-json-api'
import { AllowNull, Column, Table, DataType } from 'sequelize-typescript'

@JsonApiSchema('alignments')
@Table
export class Alignment extends JsonApiModel<Alignment> {
  @AllowNull(false)
  @Column
  public name!: string

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  isLawChaosAxis!: boolean

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  isGoodEvilAxis!: boolean

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public economy!: number

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public loyalty!: number

  @AllowNull(false)
  @Column(DataType.INTEGER)
  public stability!: number
}
