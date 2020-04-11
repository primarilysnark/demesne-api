import bodyParser from 'body-parser'
import express, { NextFunction, Request, Response } from 'express'
import jwt, { UnauthorizedError } from 'express-jwt'
import jwksRsa from 'jwks-rsa'

import * as controllers from './controllers'
import buildMiddleware from './middleware'
import { setup } from './sequelize'

const secret = jwksRsa.expressJwtSecret({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: 'https://demesne.auth0.com/.well-known/jwks.json',
})

const jwtCheck = jwt({
  secret,
  audience: 'https://demesne.auth0.com/api/v2/',
  issuer: 'https://demesne.auth0.com/',
  algorithms: ['RS256']
})

export async function getRouter() {
  await setup()

  const app = express.Router()
  const middleware = buildMiddleware()

  app.use(bodyParser.json())
  app.use(middleware.serializer)

  app.use('/', controllers.meta.getRouter(middleware))
  app.use('/map', controllers.map.getRouter(middleware))

  app.use(jwtCheck)

  app.use('/alignments', controllers.alignments.getRouter(middleware))
  app.use('/buildings', controllers.buildings.getRouter(middleware))
  app.use('/kingdoms', controllers.kingdoms.getRouter(middleware))
  app.use(
    '/leadership-roles',
    controllers.leadershipRoles.getRouter(middleware)
  )
  app.use('/rooms', controllers.rooms.getRouter(middleware))
  app.use('/users', controllers.users.getRouter(middleware))

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof UnauthorizedError) {
      return res.sendStatus(401)
    }

    return next()
  })

  return app
}
