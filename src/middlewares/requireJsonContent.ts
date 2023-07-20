import { Request, Response, NextFunction } from "express"

export default function requireJsonContent (
  request: Request,
  response: Response,
  next: NextFunction,
) {
  if (request.headers['content-type'] !== 'application/json') {
    response.status(400).send({ message: 'Server requires application/json' })
  } else {
    next()
  }
}