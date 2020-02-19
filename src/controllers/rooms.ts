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
        limit: res.locals.pagination.limit,
        offset: res.locals.pagination.offset * res.locals.pagination.limit,
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

  router.post('/', async (req, res) => {
    const [room, created] = await Room.findOrCreate({
      defaults: {
        benefit: req.body.data.attributes.benefit,
        bonus: req.body.data.attributes.bonus,
        costGoods: req.body.data.attributes.costs.goods,
        costInfluence: req.body.data.attributes.costs.influence,
        costLabor: req.body.data.attributes.costs.labor,
        costMagic: req.body.data.attributes.costs.magic,
        description: req.body.data.attributes.description,
        earnGoods: req.body.data.attributes.earnings.goods,
        earnInfluence: req.body.data.attributes.earnings.influence,
        earnLabor: req.body.data.attributes.earnings.labor,
        earnMagic: req.body.data.attributes.earnings.magic,
        earnGp: req.body.data.attributes.earnings.gp,
        maximumSize: req.body.data.attributes.size.maximum,
        minimumSize: req.body.data.attributes.size.minimum
      },
      where: {
        name: req.body.data.attributes.name
      }
    })

    if (!created) {
      return res.status(409).json({
        errors: [
          {
            detail: 'A room resource already exists with the given name',
            title: 'Resource already exists'
          }
        ]
      })
    }

    return res.status(201).serialize(room)
  })

  return router
}
