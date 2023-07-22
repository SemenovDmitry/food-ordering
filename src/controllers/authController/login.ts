import { NextFunction, Request, Response } from 'express'
import zod, { object, string } from 'zod'

import prisma from 'prisma/connection'
import { comparePasswords } from 'utils/auth'
import createToken from 'utils/createToken'
import buildFormError from 'utils/buildFormError'
import protectedUser from 'utils/protectedUser'
import formatDate from 'utils/formatDate'

type ILoginPayload = zod.infer<typeof loginSchema>

export const loginSchema = object({
  email: string().email(),
  password: string(),
}).strict()

const login = async (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body as ILoginPayload

  try {
    const activeUser = await prisma.user.findFirst({
      where: { email: payload.email.toLowerCase() },
    })

    if (!activeUser) {
      return res.status(400).json(buildFormError({ message: 'Invalid credentials' }))
    }

    const isPass = await comparePasswords(payload.password, activeUser.password)

    if (!isPass) {
      return res.status(400).json(buildFormError({ message: 'Invalid credentials' }))
    }

    const { token, expiresIn } = createToken(activeUser)

    const userWithToken = await prisma.user.update({
      where: { id: activeUser.id },
      data: { token, tokenExpires: expiresIn },
    })

    const date = userWithToken.tokenExpires ? new Date(userWithToken.tokenExpires) : new Date()
    console.log('formatted tokenExpires login :>> ', formatDate(date));

    return res.status(200).json(protectedUser(userWithToken))
  } catch (error) {
    next(error)
  }
}

export default login
