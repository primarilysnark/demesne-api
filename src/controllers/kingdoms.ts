import express from 'express'
import { Op } from 'sequelize'

import { Character, Kingdom, KingdomSummary } from '../models'
import { IMiddlewareCollection } from '../middleware'

export function getRouter(middleware: IMiddlewareCollection) {
  const router = express.Router()

  router.get(
    '/',
    middleware.pagination,
    middleware.filter,
    async (_req, res) => {
      const kingdoms = await KingdomSummary.findAll({
        limit: res.locals.pagination.limit,
        offset: res.locals.pagination.offset * res.locals.pagination.limit,
        order: ['id', 'name'],
        where: res.locals.filter
      })

      return res.serialize(kingdoms)
    }
  )

  router.get('/:kingdomId', async (req, res) => {
    const kingdom = await KingdomSummary.findOne({
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

  router.get('/:kingdomId/characters', async (req, res) => {
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

    const characters = await kingdom.$get('characters')

    return res.serialize(characters)
  })

  router.get('/:kingdomId/characters/:characterId', async (req, res) => {
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

    const character = await Character.findOne({
      where: {
        id: {
          [Op.eq]: req.params.characterId
        },
        kingdomId: {
          [Op.eq]: kingdom.id
        }
      }
    })

    if (!character) {
      return res.sendStatus(404)
    }

    return res.serialize(character)
  })

  return router
}
