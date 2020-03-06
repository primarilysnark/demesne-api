import express from 'express'
import { Op } from 'sequelize'

import { Alignment } from '../models'
import { IMiddlewareCollection } from '../middleware'

export function getRouter(middleware: IMiddlewareCollection) {
  const router = express.Router()

  router.get(
    '/',
    middleware.pagination,
    middleware.filter,
    async (_req, res) => {
      const alignments = await Alignment.findAll({
        limit: res.locals.pagination.limit,
        offset: res.locals.pagination.offset * res.locals.pagination.limit,
        order: ['id', 'name'],
        where: res.locals.filter
      })

      return res.serialize(alignments)
    }
  )

  router.get('/:alignmentId', async (req, res) => {
    const alignment = await Alignment.findOne({
      where: {
        id: {
          [Op.eq]: req.params.alignmentId
        }
      }
    })

    if (!alignment) {
      return res.sendStatus(404)
    }

    return res.serialize(alignment)
  })

  return router
}
