import { z } from "zod";

import { UserModel } from "./schema";

export type IUser = z.infer<typeof UserModel>