import { NextFunction, Request, Response } from "express"

export default function requestLogger (
  request: Request,
  response: Response,
  next: NextFunction,
) {
  console.log(`${request.method} url:: ${request.url}`)
  next()
}
