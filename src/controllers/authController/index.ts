import { Router } from 'express'

import validate from 'middlewares/validate'
import auth from 'middlewares/auth'
import tryCatch from 'middlewares/tryCatch'

import signUp, { signUpSchema } from './signUp'
import signIn, { signInSchema } from './signIn'
import me from './me'

const authRouter = Router()

authRouter.post('/sign-up', validate(signUpSchema), signUp)
authRouter.post('/sign-in', validate(signInSchema), tryCatch(signIn))

authRouter.get('/me', auth, me)

export default authRouter
