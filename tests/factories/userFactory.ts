import { getRepository } from "typeorm";
import bcrypt from "bcrypt";

import User from "../../src/entities/User";
import { IUser } from "../../src/types/User";

export const userDefault: IUser = {
  email: 'test@email.com',
  password: '123456',
  confirmPassword: '123456'
}

export async function createUser (user?: IUser) {
  return await getRepository(User).insert({
    email: user?.email || userDefault.email,
    password: bcrypt.hashSync(user?.password || userDefault.password, 10)
  });
}
