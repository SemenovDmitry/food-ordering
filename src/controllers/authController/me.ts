import { NextFunction, Request, Response } from 'express'

import prisma from 'prisma/connection'
import createExpiredToken from 'utils/createExpiredToken'
import protectedUser from 'utils/protectedUser'

const me = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = req

  try {
    const { token, expiresIn } = createExpiredToken(user)

    const userWithToken = await prisma.user.update({
      where: { id: user.id },
      data: { token, tokenExpiresAt: expiresIn },
    })

    return res.status(201).json(protectedUser(userWithToken))
  } catch (error) {
    next(error)
  }
}

export default me
