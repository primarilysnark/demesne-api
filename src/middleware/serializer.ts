import { JsonApiModel } from '@primarilysnark/sequelize-json-api'
import { NextFunction, Request, Response } from 'express'
import { serializer } from '../sequelize'
import { ValidationError as JoiValidationError } from 'joi'
import { ValidationError as SequelizeValidationError } from 'sequelize/types'

function isJoiValidationError(
  model: JoiValidationError | SequelizeValidationError
): model is JoiValidationError {
  return (model as JoiValidationError).isJoi !== undefined
}

declare global {
  namespace Express {
    // tslint:disable-next-line:interface-name
    export interface Response {
      serialize: <T extends JsonApiModel<T>>(
        model: T | T[],
        options?: object
      ) => void
      error: (error: JoiValidationError | SequelizeValidationError) => void
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

    res.error = (error: JoiValidationError | SequelizeValidationError) => {
      if (isJoiValidationError(error)) {
        return res.status(400).json({
          errors: error.details.map(detail => ({
            status: '400',
            source: {
              pointer: `/data/attributes/${detail.path.join('/')}`
            },
            title: detail.type,
            details: detail.message
          }))
        })
      }

      return res.status(400).json({
        errors: error.errors.map(detail => ({
          status: '400',
          source: {
            pointer: `/data/attributes/${detail.path}`
          },
          title: detail.type,
          details: detail.message
        }))
      })
    }

    return next()
  }
}
