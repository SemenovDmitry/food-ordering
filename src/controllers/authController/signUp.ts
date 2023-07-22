import { Prisma } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'
import zod, { object, string } from 'zod'

import prisma from 'prisma/connection'
import { encryptPassword } from 'utils/auth'
import createToken from 'utils/createToken'
import buildFormError from 'utils/buildFormError'
import formatDate from 'utils/formatDate'

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

  try {
    const isUserExist = await prisma.user.findFirst({
      where: { email: payload.email.toLowerCase() },
    })

    if (isUserExist) {
      return res.status(400).json(buildFormError({ message: 'Sign up error' }))
    }

    const encryptedPassword = await encryptPassword(payload.password)

    const userData: Prisma.UserCreateInput = {
      email: payload.email.toLowerCase(),
      password: encryptedPassword,
    }

    const user = await prisma.user.create({ data: userData })

    const { token, expiresIn } = createToken(user)

    const userWithToken = await prisma.user.update({
      where: { id: user.id },
      data: { token, tokenExpires: expiresIn },
    })

    const date = userWithToken.tokenExpires ? new Date(userWithToken.tokenExpires) : new Date()
    console.log('formatted tokenExpires login :>> ', formatDate(date));

    return res.status(200).json(userWithToken)
  } catch (error) {
    next(error)
  }
}

export default signUp
