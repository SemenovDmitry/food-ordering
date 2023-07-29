import jwt from 'jsonwebtoken'

import { IUser } from 'types/models'
import { tokenSecret } from 'consts/env'
import { MINUTE } from 'consts/time'

type ICreateExpiredToken = {
  token: string
  expiresIn: string
}

// MINUTE * 2 and  60 * 2 same time (2 minutes)
const tokenLiveTime = MINUTE * 2

export const createExpiredToken = ({ id }: IUser): ICreateExpiredToken => {
  const expiresIn = new Date(new Date().getTime() + tokenLiveTime)

  const token = jwt.sign({ id }, tokenSecret, { expiresIn: 60 * 2 })

  return {
    token,
    expiresIn: expiresIn.toISOString(),
  }
}

export default createExpiredToken
