import { getConnection, getRepository } from "typeorm";

import User from "../../src/entities/User";

export const clearDatabase = async () => {
  await getRepository(User).delete({});
}

export const endConnection = async () => {
  await getConnection().close();
}