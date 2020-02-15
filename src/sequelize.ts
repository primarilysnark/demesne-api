import { JsonApiModel, Serializer } from '@primarilysnark/sequelize-json-api'
import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { Dialect } from 'sequelize'

import * as models from './models'

let sequelize: Sequelize

export let serializer = new Serializer({
  baseUrl: (process.env.APP_HOST || 'http://localhost:8080') + '/api'
})

export async function setup<T extends JsonApiModel<T>>() {
  if (process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL)
  } else {
    const env =
      (process.env.NODE_ENV as 'development' | 'test' | 'production') ||
      'development'

    const configs = require('../config/database.json')
    const config: SequelizeOptions = {
      ...configs[env],
      dialect: configs[env].dialect as Dialect
    }

    sequelize = new Sequelize(config)
  }

  await sequelize.addModels(
    Object.values(models).filter(model => typeof model === 'function')
  )

  const jsonApiModels: JsonApiModel<T>[] = (Object.values(
    sequelize.models
  ) as unknown) as JsonApiModel<T>[]

  return Promise.all(jsonApiModels.map(model => serializer.define(model)))
}
