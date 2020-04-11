import express from 'express'
import { User } from 'auth0'

import { client } from '../services/auth0'
import { IMiddlewareCollection } from '../middleware'

function mapAuth0UserToApiUser(user: User) {
  return {
    id: user.user_id,
    attributes: {
      avatar: user.picture,
      name: user.name,
      nickname: user.nickname
    },
    links: {
      self: `${process.env.APP_HOST || 'http://localhost:8080'}/api/users/${
        user.user_id
      }`
    }
  }
}

export function getRouter(middleware: IMiddlewareCollection) {
  const router = express.Router()

  router.get('/', async (_req, res) => {
    const users = await client.getUsers()

    return res.json({
      data: users.map(mapAuth0UserToApiUser)
    })
  })

  router.get('/:userId', async (req, res) => {
    const user = await client.getUser({
      id: req.params.userId
    })

    return res.json({
      data: mapAuth0UserToApiUser(user)
    })
  })

  return router
}
