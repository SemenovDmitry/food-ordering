import * as bcrypt from "bcrypt";

import { IUser } from "types/models";

export const comparePasswords = async (password: IUser['password'], hash: string) => {
  return await bcrypt.compare(password, hash);
};

export const encryptPassword = async (password: IUser['password']) => {
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);
  return encryptedPassword
};
