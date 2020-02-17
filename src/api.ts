import express from 'express'

import * as controllers from './controllers'
import buildMiddleware from './middleware'
import { setup } from './sequelize'

export async function getRouter() {
  await setup()

  const app = express.Router()
  const middleware = buildMiddleware()

  app.use(middleware.serializer)

  app.use('/', controllers.meta.getRouter(middleware))
  app.use('/map', controllers.map.getRouter(middleware))
  app.use('/rooms', controllers.rooms.getRouter(middleware))

  return app
}
