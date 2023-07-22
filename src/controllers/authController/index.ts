import { Router } from 'express'

import validate from 'middlewares/validate'
import auth from 'middlewares/auth'

import signUp, { signUpSchema } from './signUp'
import login, { loginSchema } from './login'
import me from './me'

const authRouter = Router()

authRouter.post('/sign-up', validate(signUpSchema), signUp)
authRouter.post('/login', validate(loginSchema), login)

authRouter.get('/me', auth, me)

export default authRouter
