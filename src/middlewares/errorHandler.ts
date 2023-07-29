import { Request, Response, NextFunction } from 'express'

export default function errorHandler(
  error: any , // Error || AppError
  request: Request,
  response: Response,
  next: NextFunction,
) {
  response.header('Content-Type', 'application/json')

  const status = error.status || 500
  const message = error.message || 'NO ERROR MESSAGE'
  const stack = error.stack || 'NO ERROR STACK'

  response.status(status).send({ message, stack })
}
