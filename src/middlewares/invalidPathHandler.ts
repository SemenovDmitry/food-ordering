import { Request, Response, NextFunction } from 'express'

export default function invalidPathHandler (
  request: Request,
  response: Response,
  next: NextFunction,
) {
  return response.status(404).send({ message: 'invalid path' })
}
