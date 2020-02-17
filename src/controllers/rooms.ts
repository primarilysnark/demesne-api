import express from 'express'
import { Op } from 'sequelize'

import { IMiddlewareCollection } from '../middleware'
import { Room } from '../models'

export function getRouter(middleware: IMiddlewareCollection) {
  const router = express.Router()

  router.get(
    '/',
    middleware.pagination,
    middleware.filter,
    async (_req, res) => {
      const rooms = await Room.findAll({
        order: ['id', 'name'],
        where: res.locals.filter
      })

      return res.serialize(rooms)
    }
  )

  router.get('/:roomId', async (req, res) => {
    const room = await Room.findOne({
      where: {
        id: {
          [Op.eq]: req.params.roomId
        }
      }
    })

    if (!room) {
      return res.sendStatus(404)
    }

    return res.serialize(room)
  })

  return router
}
