import { Request, Response } from "express";
import { getRepository } from "typeorm";

import User from "../entities/User";
import { HttpException } from "../errors/HttpException";
import userSchema from "../schemas/user.schema";
import { IUser } from "../types/User";

export const signup = async (user: IUser) => {
  const validation = userSchema(user);
  if(validation.error) throw new HttpException(validation.error.details[0].message, 400);
  
  const repository = getRepository(User);
  
  const isExistent = await repository.findOne({where: {email: user.email}});
  if(isExistent) throw new HttpException('User already exists.', 409);

  repository.insert(user);
}
