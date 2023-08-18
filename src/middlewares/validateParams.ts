import { Request, Response, NextFunction } from 'express'
import { ZodError, ZodSchema } from 'zod'

const validateParams =
  (schema: ZodSchema) => async (request: Request, response: Response, next: NextFunction) => {
    const { params } = request

    try {
      const validated = await schema.parseAsync(params)
      request.params = validated
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        const bodyErrors = error.format();
        const invalidPaths = error.flatten();
        // (bad request)
        return response.status(400).send(bodyErrors)
      }

      return next(error)
    }
  }

export default validateParams
