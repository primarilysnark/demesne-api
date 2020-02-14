import { JsonApiModel, Serializer } from '@primarilysnark/sequelize-json-api'
import { Sequelize, SequelizeOptions, Model } from 'sequelize-typescript'
import { Dialect, ModelCtor } from 'sequelize'

import configs from '../config/database.json'
import * as models from './models'

const env = 'development'
const config: SequelizeOptions = {
  ...configs[env],
  dialect: configs[env].dialect as Dialect
}

const sequelize = new Sequelize(config)

export let serializer = new Serializer({
  baseUrl: (process.env.APP_HOST || 'http://localhost:8080') + '/api'
})

export async function setup<T extends JsonApiModel<T>>() {
  await sequelize.addModels(
    Object.values(models).filter(model => typeof model === 'function')
  )

  const jsonApiModels: JsonApiModel<T>[] = (Object.values(
    sequelize.models
  ) as unknown) as JsonApiModel<T>[]

  return Promise.all(jsonApiModels.map(model => serializer.define(model)))
}
