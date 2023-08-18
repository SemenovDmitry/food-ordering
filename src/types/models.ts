import { z } from "zod";

import { UserModel } from "./schema";

export type IUser = z.infer<typeof UserModel>

export type IWithPagination = {
  page: number;
  pageSize: number;
}
