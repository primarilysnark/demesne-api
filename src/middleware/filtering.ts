import { NextFunction, Request, Response } from 'express'
import { Op } from 'sequelize'

const PRESERVE_COMMA_FIELDS = ['url']

interface Filter {
  contains: string | null
}

interface FilterMap {
  [key: string]: string | Filter
}

function tryParseBoolean(value: string) {
  switch (value) {
    case 'true':
      return true

    case 'false':
      return false

    default:
      return value
  }
}

function parse(filterMap: FilterMap) {
  const filters = new Map(
    Object.keys(filterMap).map(filterKey => [filterKey, filterMap[filterKey]])
  )

  let parsedFilter = {}
  filters.forEach((value, key) => {
    if (typeof value !== 'string' && value.contains) {
      parsedFilter = {
        ...parsedFilter,
        [key]: {
          [Op.iLike]: `%${value.contains}%`
        }
      }
    } else if (typeof value === 'string' && value.length !== 0) {
      const values = PRESERVE_COMMA_FIELDS.includes(key)
        ? [value]
        : value.split(',')

      if (values.length === 1) {
        const parsedValue = tryParseBoolean(values[0])

        if (typeof parsedValue === 'boolean') {
          parsedFilter = {
            ...parsedFilter,
            [key]: {
              [Op.eq]: parsedValue
            }
          }
        } else {
          parsedFilter = {
            ...parsedFilter,
            [key]: {
              [Op.iLike]: parsedValue
            }
          }
        }
      } else {
        parsedFilter = {
          ...parsedFilter,
          [key]: {
            [Op.iLike]: {
              [Op.any]: values.map(tryParseBoolean)
            }
          }
        }
      }
    }
  })

  return parsedFilter
}

export function middleware() {
  return (req: Request, res: Response, next: NextFunction) => {
    res.locals.filter = parse(req.query.filter || {})

    return next()
  }
}
