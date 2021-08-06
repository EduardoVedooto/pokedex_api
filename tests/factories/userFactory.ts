import { getRepository } from "typeorm";
import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";

import User from "../../src/entities/User";
import { IUser, IUserLogin } from "../../src/types/User";
import Session from "../../src/entities/Session";

export const userDefault: IUser = {
  email: 'test@email.com',
  password: '123456',
  confirmPassword: '123456'
}

export const userLoginDefault: IUserLogin = {
  email: 'test@email.com',
  password: '123456',
}

export const createUser = async (user?: IUser) => {
  return await getRepository(User).insert({
    email: user?.email || userDefault.email,
    password: bcrypt.hashSync(user?.password || userDefault.password, 10)
  });
}

export const login = async (userParams?: IUserLogin): Promise<string> => {
  const user = await getRepository(User).findOne({
    where: {
      email: userParams?.email || userLoginDefault.email
    }
  });
  const token = uuid();
  await getRepository(Session).insert({token, user});
  return token;
}