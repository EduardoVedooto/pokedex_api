import { getConnection, getRepository } from "typeorm";

import User from "../../src/entities/User";

export const clearDatabase = async () => {
  await getRepository(User).query(`
    TRUNCATE TABLE users RESTART IDENTITY CASCADE
  `);
}

export const endConnection = async () => {
  await getConnection().close();
}