import { Request, Response, NextFunction } from "express"

export default function errorLogger(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  console.log(`Error! message: >>> ${error.message}`)
  return next(error)
}
