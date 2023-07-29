import * as z from "zod"

export const UserModel = z.object({
  id: z.number().int(),
  name: z.string().nullish(),
  email: z.string(),
  password: z.string(),
  token: z.string().nullish(),
  tokenExpiresAt: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
