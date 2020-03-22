import express from 'express'
import { Op, ValidationError } from 'sequelize'

import {
  Character,
  Kingdom,
  KingdomSummary,
  KingdomTurnAction,
  KingdomTurnActionSchema
} from '../models'
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

  router.get('/:kingdomId/actions/', async (req, res) => {
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

    const turnActions = await KingdomTurnAction.findAll({
      where: {
        kingdomId: {
          [Op.eq]: kingdom.id
        }
      }
    })

    if (!turnActions) {
      return res.sendStatus(404)
    }

    return res.serialize(turnActions)
  })

  router.post('/:kingdomId/actions/', async (req, res) => {
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

    let result
    try {
      result = await KingdomTurnActionSchema.validate(
        req.body.data.attributes,
        {
          abortEarly: false,
          convert: false
        }
      )
    } catch (err) {
      return res.error(err)
    }

    try {
      const kingdomTurnAction = await KingdomTurnAction.create({
        ...result,
        kingdomId: kingdom.id
      })

      return res.serialize(kingdomTurnAction)
    } catch (err) {
      if (err instanceof ValidationError) {
        return res.error(err)
      }

      throw err
    }
  })

  return router
}
