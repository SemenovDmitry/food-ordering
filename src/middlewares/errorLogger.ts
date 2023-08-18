import { Request, Response, NextFunction } from 'express'

export default function errorLogger(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  console.log(
    `[Error Logger]: Path: ${request.path}, Method: ${request.method}, Stack: ${error.stack}`,
  )
  next(error)
}
