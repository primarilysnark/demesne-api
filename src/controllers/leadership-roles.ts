import express from 'express'
import { Op } from 'sequelize'

import { LeadershipRole } from '../models'
import { IMiddlewareCollection } from '../middleware'

export function getRouter(middleware: IMiddlewareCollection) {
  const router = express.Router()

  router.get(
    '/',
    middleware.pagination,
    middleware.filter,
    async (_req, res) => {
      const leadershipRoles = await LeadershipRole.findAll({
        limit: res.locals.pagination.limit,
        offset: res.locals.pagination.offset * res.locals.pagination.limit,
        order: ['id', 'name'],
        where: res.locals.filter
      })

      return res.serialize(leadershipRoles)
    }
  )

  router.get('/:leadershipRoleId', async (req, res) => {
    const leadershipRole = await LeadershipRole.findOne({
      where: {
        id: {
          [Op.eq]: req.params.leadershipRoleId
        }
      }
    })

    if (!leadershipRole) {
      return res.sendStatus(404)
    }

    return res.serialize(leadershipRole)
  })

  return router
}
