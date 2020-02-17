import { NextFunction, Request, Response } from 'express'
import * as filtering from './filtering'
import * as pagination from './pagination'
import * as serializer from './serializer'

export interface IMiddlewareCollection {
  filter: (req: Request, res: Response, next: NextFunction) => void
  pagination: (req: Request, res: Response, next: NextFunction) => void
  serializer: (req: Request, res: Response, next: NextFunction) => void
}

export default function buildMiddleware(): IMiddlewareCollection {
  return {
    filter: filtering.middleware(),
    pagination: pagination.middleware(),
    serializer: serializer.middleware()
  }
}
