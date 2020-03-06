import express from 'express'
import { Op } from 'sequelize'

import { Kingdom } from '../models'
import { IMiddlewareCollection } from '../middleware'

export function getRouter(middleware: IMiddlewareCollection) {
  const router = express.Router()

  router.get(
    '/',
    middleware.pagination,
    middleware.filter,
    async (_req, res) => {
      const kingdoms = await Kingdom.findAll({
        limit: res.locals.pagination.limit,
        offset: res.locals.pagination.offset * res.locals.pagination.limit,
        order: ['id', 'name'],
        where: res.locals.filter
      })

      return res.serialize(kingdoms)
    }
  )

  router.get('/:kingdomId', async (req, res) => {
    const kingdom = await Kingdom.findOne({
      where: {
        id: {
          [Op.eq]: req.params.kingdomId
        }
      }
    })

    if (!kingdom) {
      return res.sendStatus(404)
    }

    return res.serialize(kingdom)
  })

  return router
}
