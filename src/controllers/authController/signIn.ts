import { NextFunction, Request, Response } from 'express'
import zod, { object, string } from 'zod'

import prisma from 'prisma/connection'
import { comparePasswords } from 'utils/auth'
import createExpiredToken from 'utils/createExpiredToken'
import buildFormError from 'utils/buildFormError'
import serializeUser from 'serializers/serializeUser'

type ISignInPayload = zod.infer<typeof signInSchema>

export const signInSchema = object({
  email: string().email(),
  password: string(),
}).strict()

const signIn = async (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body as ISignInPayload

  const activeUser = await prisma.user.findFirst({
    where: { email: payload.email.toLowerCase() },
  })

  if (!activeUser) {
    return res.status(422).json(buildFormError({ message: 'Invalid email or password' }))
  }

  const isPass = await comparePasswords(payload.password, activeUser.password)

  if (!isPass) {
    return res.status(422).json(buildFormError({ message: 'Invalid email or password' }))
  }

  const { token, expiresIn } = createExpiredToken(activeUser)

  const userWithToken = await prisma.user.update({
    where: { id: activeUser.id },
    data: { token, tokenExpiresAt: expiresIn },
  })

  return res.status(201).json(serializeUser(userWithToken))
}

export default signIn
