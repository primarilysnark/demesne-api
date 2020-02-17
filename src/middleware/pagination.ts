import { NextFunction, Request, Response } from 'express'

export function middleware() {
  return (req: Request, res: Response, next: NextFunction) => {
    res.locals.pagination = {}

    if (req.query.page) {
      res.locals.pagination.limit = parseInt(req.query.page.size || 20, 10)
      res.locals.pagination.offset = parseInt(req.query.page.number || 0, 10)
    } else {
      res.locals.pagination = {
        limit: 20,
        offset: 0
      }
    }

    return next()
  }
}
