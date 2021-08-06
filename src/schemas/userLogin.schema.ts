import Joi from "joi";
import { IUserLogin } from "../types/User";


const userLoginSchema = (data: IUserLogin) => {
  return Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(6).required()
  }).validate(data);
}

export default userLoginSchema;