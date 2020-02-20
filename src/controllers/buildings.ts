import express from 'express'
import { Op } from 'sequelize'

import { Building } from '../models'
import { IMiddlewareCollection } from '../middleware'

export function getRouter(middleware: IMiddlewareCollection) {
  const router = express.Router()

  router.get(
    '/',
    middleware.pagination,
    middleware.filter,
    async (_req, res) => {
      const buildings = await Building.findAll({
        limit: res.locals.pagination.limit,
        offset: res.locals.pagination.offset * res.locals.pagination.limit,
        order: ['id', 'name'],
        where: res.locals.filter
      })

      return res.serialize(buildings)
    }
  )

  router.post('/', async (req, res) => {
    const building = await Building.create({
      name: req.body.data.attributes.name
    })

    return res.status(201).serialize(building)
  })

  router.get('/:buildingId', async (req, res) => {
    const building = await Building.findOne({
      where: {
        id: {
          [Op.eq]: req.params.buildingId
        }
      }
    })

    if (!building) {
      return res.sendStatus(404)
    }

    return res.serialize(building)
  })

  router.post('/:buildingId', async (req, res) => {
    let building = await Building.findOne({
      where: {
        id: {
          [Op.eq]: req.params.buildingId
        }
      }
    })

    if (!building) {
      return res.sendStatus(404)
    }

    building = await building.update({
      name: req.body.data.attributes.name
    })

    return res.status(200).serialize(building)
  })

  return router
}
