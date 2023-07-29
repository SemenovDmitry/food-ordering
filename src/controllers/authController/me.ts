import { NextFunction, Request, Response } from 'express'

import prisma from 'prisma/connection'
import createToken from 'utils/createToken'
import protectedUser from 'utils/protectedUser'

const me = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = req

  try {
    const { token, expiresIn } = createToken(user)

    const userWithToken = await prisma.user.update({
      where: { id: user.id },
      data: { token, tokenExpiresAt: expiresIn },
    })

    return res.status(200).json(protectedUser(userWithToken))
  } catch (error) {
    next(error)
  }
}

export default me
