import jwt from 'jsonwebtoken'

import { IUser } from 'types/models'
import { tokenSecret } from 'consts/env'
import { MINUTE } from 'consts/time'

type ICreateExpiredToken = {
  token: string
  expiresIn: string
}

// MINUTE * 60 and  60 * 60 same time (60 minutes)
const tokenLiveTime = MINUTE * 60
const jwtExpiresIn = 60 * 60
// { tokenLiveTime: 120000, jwtExpiresIn: 120 } // 2
// { tokenLiveTime: 3600000, jwtExpiresIn: 3600 } // 60

export const createExpiredToken = ({ id }: IUser): ICreateExpiredToken => {
  console.log({ tokenLiveTime, jwtExpiresIn });
  const expiresIn = new Date(new Date().getTime() + tokenLiveTime)

  const token = jwt.sign({ id }, tokenSecret, { expiresIn: jwtExpiresIn })

  return {
    token,
    expiresIn: expiresIn.toISOString(),
  }
}

export default createExpiredToken
