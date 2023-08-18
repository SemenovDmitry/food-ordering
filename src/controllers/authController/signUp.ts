import { Prisma } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import zod, { object, string } from 'zod'

import prisma from 'prisma/connection'
import { encryptPassword } from 'utils/auth'
import createExpiredToken from 'utils/createExpiredToken'
import buildFormError from 'utils/buildFormError'
import serializeUser from 'serializers/serializeUser'

type ISignUpPayload = zod.infer<typeof signUpSchema>

export const signUpSchema = object({
  email: string().email(),
  password: string(),
  passwordConfirmation: string(),
})
  .strict()
  .refine(({ password, passwordConfirmation }) => password === passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  })

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body as ISignUpPayload
  
  const isUserExist = await prisma.user.findFirst({
    where: { email: payload.email.toLowerCase() },
  })

  if (isUserExist) {
    return res.status(422).json(buildFormError({ message: 'Email already used' }))
  }

  const encryptedPassword = await encryptPassword(payload.password)

  const userData: Prisma.UserCreateInput = {
    email: payload.email.toLowerCase(),
    password: encryptedPassword,
  }

  const user = await prisma.user.create({ data: userData })

  const { token, expiresIn } = createExpiredToken(user)

  const userWithToken = await prisma.user.update({
    where: { id: user.id },
    data: { token, tokenExpiresAt: expiresIn },
  })

  return res.status(201).json(serializeUser(userWithToken))
}

export default signUp
