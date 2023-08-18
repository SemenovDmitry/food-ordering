import { IUser, IWithPagination } from "types/models";

declare global {
  namespace Express {
    interface Request {
      user: IUser
      pagination: IWithPagination
    }
  }
}
