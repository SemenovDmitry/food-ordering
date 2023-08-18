import { Request, Response, NextFunction } from 'express'
import { ZodError, ZodSchema } from 'zod'

import { inspect } from 'util'

const validateRequest =
  (schema: ZodSchema) => (request: Request, response: Response, next: NextFunction) => {
    const { body, query, params } = request

    try {
      schema.parse({ body, query, params })

      next()
    } catch (error) {
      if (error instanceof ZodError) {
        inspect(error)
        return response.status(400).send(error.format())
      }

      return next(error)
    }
  }

export default validateRequest
