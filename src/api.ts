import express from 'express'

import * as controllers from './controllers'
import { setup } from './sequelize'

export async function getRouter() {
  await setup()

  const app = express.Router()

  app.use('/', controllers.meta.getRouter())
  app.use('/map', controllers.map.getRouter())

  return app
}
