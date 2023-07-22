import { Request } from "express"

import { IUser } from "types/models"

export type IAuthRequest = Request & {
  user: IUser
}
