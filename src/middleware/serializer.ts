import { JsonApiModel } from '@primarilysnark/sequelize-json-api'
import { NextFunction, Request, Response } from 'express'
import { serializer } from '../sequelize'

declare global {
  namespace Express {
    // tslint:disable-next-line:interface-name
    export interface Response {
      serialize: <T extends JsonApiModel<T>>(
        model: T | T[],
        options?: object
      ) => void
    }
  }
}

export function middleware() {
  return async (req: Request, res: Response, next: NextFunction) => {
    res.serialize = async (model, options = {}) => {
      if (Array.isArray(model) && model.length === 0) {
        return res.json({
          data: []
        })
      }

      if (res.locals.pagination) {
        options = {
          ...options,
          ...res.locals.pagination
        }
      }

      if (res.locals.filter) {
        options = {
          ...options,
          ...res.locals.filter
        }
      }

      let payload
      try {
        payload = await serializer.serialize(model, options)
      } catch (err) {
        return next(err)
      }

      return res.json(payload)
    }

    return next()
  }
}
