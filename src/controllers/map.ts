import { Op } from 'sequelize'

import { Hex, Map } from '../models'
import { serializer } from '../sequelize'
import * as websocket from './websocket'

export function getRouter() {
  const router = websocket.Router('/')

  router.onMessage(
    'add-hex',
    async (
      _req: any,
      _res: any,
      _ws: any,
      message: {
        mapId: number
        column: number
        row: number
        terrain: string
      }
    ) => {
      // tslint:disable-next-line: prefer-const
      let [hex, created] = await Hex.findOrCreate({
        defaults: {
          terrain: message.terrain
        },
        where: {
          column: message.column,
          mapId: message.mapId,
          row: message.row
        }
      })

      if (!created) {
        hex = await hex.update({
          terrain: message.terrain
        })
      }

      if (created) {
        router.broadcast('hex-added', {
          column: hex.column,
          mapId: message.mapId,
          row: hex.row,
          terrain: hex.terrain
        })
      } else {
        router.broadcast('hex-updated', {
          column: hex.column,
          mapId: message.mapId,
          row: hex.row,
          terrain: hex.terrain
        })
      }
    }
  )

  router.onMessage(
    'remove-hex',
    async (
      _req: any,
      _res: any,
      _ws: any,
      message: {
        mapId: number
        column: number
        row: number
      }
    ) => {
      const hex = await Hex.findOne({
        where: {
          column: message.column,
          mapId: message.mapId,
          row: message.row
        }
      })

      if (!hex) {
        return
      }

      await hex.destroy()

      router.broadcast('hex-removed', {
        column: message.column,
        mapId: message.mapId,
        row: message.row
      })
    }
  )

  router.onMessage(
    'sync',
    async (_req: any, _res: any, _ws: any, message: { mapId: number }) => {
      const maps = await Hex.findAll({
        order: ['column', 'row'],
        include: [
          {
            as: 'map',
            model: Map,
            where: {
              id: {
                [Op.eq]: message.mapId
              }
            }
          }
        ]
      })

      if (!maps || maps.length === 0) {
        return []
      }

      return {
        type: 'sync',
        content: await serializer.serialize(maps)
      }
    }
  )

  return router
}
