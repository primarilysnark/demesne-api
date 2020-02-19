import {
  JsonApiIgnore,
  JsonApiModel,
  JsonApiSchema
} from '@primarilysnark/sequelize-json-api'
import { AllowNull, Column, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'

export interface IRoomCost {
  goods: number
  influence: number
  labor: number
  magic: number
}

export interface IRoomEarnings {
  goods: boolean
  influence: boolean
  labor: boolean
  magic: boolean
  gp: boolean
}

export interface IRoomSize {
  minimum: number
  maximum: number
}

@JsonApiSchema('rooms')
@Table
export class Room extends JsonApiModel<Room> {
  @AllowNull(false)
  @Column
  public name!: string

  @AllowNull(false)
  @Column(DataTypes.TEXT)
  public description!: string

  @Column
  public benefit: string

  @JsonApiIgnore
  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  public minimumSize!: number

  @JsonApiIgnore
  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  public maximumSize!: number

  @Column(DataTypes.INTEGER)
  public bonus: number

  @JsonApiIgnore
  @AllowNull(false)
  @Column(DataTypes.BOOLEAN)
  public earnGoods!: boolean

  @JsonApiIgnore
  @AllowNull(false)
  @Column(DataTypes.BOOLEAN)
  public earnInfluence!: boolean

  @JsonApiIgnore
  @AllowNull(false)
  @Column(DataTypes.BOOLEAN)
  public earnLabor!: boolean

  @JsonApiIgnore
  @AllowNull(false)
  @Column(DataTypes.BOOLEAN)
  public earnMagic!: boolean

  @JsonApiIgnore
  @AllowNull(false)
  @Column(DataTypes.BOOLEAN)
  public earnGp!: boolean

  @JsonApiIgnore
  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  public costGoods!: number

  @JsonApiIgnore
  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  public costInfluence!: number

  @JsonApiIgnore
  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  public costLabor!: number

  @JsonApiIgnore
  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  public costMagic!: number

  public get cost(): IRoomCost {
    return {
      goods: this.getDataValue('costGoods'),
      influence: this.getDataValue('costInfluence'),
      labor: this.getDataValue('costLabor'),
      magic: this.getDataValue('costMagic')
    }
  }

  public set cost(valueToSet: IRoomCost) {
    this.setDataValue('costGoods', valueToSet.goods)
    this.setDataValue('costInfluence', valueToSet.influence)
    this.setDataValue('costLabor', valueToSet.labor)
    this.setDataValue('costMagic', valueToSet.magic)
  }

  public get earnings(): IRoomEarnings {
    return {
      goods: this.getDataValue('earnGoods'),
      influence: this.getDataValue('earnInfluence'),
      labor: this.getDataValue('earnLabor'),
      magic: this.getDataValue('earnMagic'),
      gp: this.getDataValue('earnGp')
    }
  }

  public set earnings(valueToSet: IRoomEarnings) {
    this.setDataValue('earnGoods', valueToSet.goods)
    this.setDataValue('earnInfluence', valueToSet.influence)
    this.setDataValue('earnLabor', valueToSet.labor)
    this.setDataValue('earnMagic', valueToSet.magic)
    this.setDataValue('earnGp', valueToSet.gp)
  }

  public get size(): IRoomSize {
    return {
      minimum: this.getDataValue('minimumSize'),
      maximum: this.getDataValue('maximumSize')
    }
  }

  public set size(valueToSet: IRoomSize) {
    this.setDataValue('minimumSize', valueToSet.minimum)
    this.setDataValue('maximumSize', valueToSet.maximum)
  }
}
