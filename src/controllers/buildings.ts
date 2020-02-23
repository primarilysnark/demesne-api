import express from 'express'
import { Op } from 'sequelize'

import { Building, BuildingEntry, Room } from '../models'
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

  router.get('/:buildingId/entries', async (req, res) => {
    const buildingEntries = await BuildingEntry.findAll({
      where: {
        buildingId: {
          [Op.eq]: req.params.buildingId
        }
      },
      include: [
        {
          as: 'room',
          model: Room
        }
      ]
    })

    if (!buildingEntries) {
      return res.sendStatus(404)
    }

    return res.serialize(buildingEntries)
  })

  router.post('/:buildingId/entries', async (req, res) => {
    const building = await Building.findByPk(req.params.buildingId)

    if (!building) {
      return res.sendStatus(404)
    }

    const buildingEntry = await BuildingEntry.create({
      buildingId: building.id,
      earningAllocation: req.body.data.attributes.earningAllocation,
      roomId: req.body.data.relationships.room.data.id
    })

    return res.serialize(buildingEntry)
  })

  router.get('/:buildingId/entries/:entryId', async (req, res) => {
    const buildingEntries = await BuildingEntry.findOne({
      where: {
        id: {
          [Op.eq]: req.params.entryId
        },
        buildingId: {
          [Op.eq]: req.params.buildingId
        }
      },
      include: [
        {
          as: 'room',
          model: Room
        }
      ]
    })

    if (!buildingEntries) {
      return res.sendStatus(404)
    }

    return res.serialize(buildingEntries)
  })

  router.post('/:buildingId/entries/:entryId', async (req, res) => {
    let buildingEntry = await BuildingEntry.findOne({
      where: {
        id: {
          [Op.eq]: req.params.entryId
        },
        buildingId: {
          [Op.eq]: req.params.buildingId
        }
      },
      include: [
        {
          as: 'room',
          model: Room
        }
      ]
    })

    if (!buildingEntry) {
      return res.sendStatus(404)
    }

    buildingEntry = await buildingEntry.update({
      earningAllocation: req.body.data.attributes.earningAllocation
    })

    return res.serialize(buildingEntry)
  })

  router.delete('/:buildingId/entries/:entryId', async (req, res) => {
    const buildingEntry = await BuildingEntry.findOne({
      where: {
        id: {
          [Op.eq]: req.params.entryId
        },
        buildingId: {
          [Op.eq]: req.params.buildingId
        }
      },
      include: [
        {
          as: 'room',
          model: Room
        }
      ]
    })

    if (!buildingEntry) {
      return res.sendStatus(404)
    }

    await buildingEntry.destroy()

    return res.sendStatus(204)
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
