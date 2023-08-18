import { Router } from 'express'

import validateBody from 'middlewares/validateBody'
import tryCatch from 'middlewares/tryCatch'

import signUp, { signUpSchema } from './signUp'
import signIn, { signInSchema } from './signIn'

const authRouter = Router()

authRouter.post('/sign-up', validateBody(signUpSchema), tryCatch(signUp))
authRouter.post('/sign-in', validateBody(signInSchema), tryCatch(signIn))

export default authRouter
