import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { tokenSecret } from 'consts/env'
import formatDate from 'utils/formatDate'
import prisma from 'prisma/connection'

type ITokenData = {
  id: number
  iat: number
  exp: number
}

const roles = ['admin', 'employee']

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed. Token not provided.' })
  }

  try {
    const { id, exp } = jwt.verify(token, tokenSecret) as ITokenData
    console.log('token expires in :>> ', formatDate(new Date(exp * 1000)))

    const user = await prisma.user.findFirst({
      where: { id, token },
    })

    if (!user) {
      return res.status(403).json({ message: 'Authentication failed' })
    }

    req.user = user

    return next()
  } catch (error) {
    return res.status(403).json({ message: 'Authentication failed. Invalid token.' })
  }
}

export default auth
