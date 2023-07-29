import { Request, Response, NextFunction } from 'express'
import { ZodError, ZodSchema } from 'zod'

const validate =
  (schema: ZodSchema) => async (request: Request, response: Response, next: NextFunction) => {
    const { body } = request

    try {
      await schema.parseAsync(body)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        const bodyErrors = error.format();
        const invalidPaths = error.flatten();
        return response.status(422).send(invalidPaths)
      }

      return next(error)
    }
  }

export default validate
