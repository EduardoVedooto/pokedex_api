import supertest from "supertest";
import app, { init } from "../../src/app";
import { createUser, login } from "../factories/userFactory";
import { clearDatabase, endConnection } from "../utils/database";

beforeAll(async () => {
  await init();
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await endConnection();
});

const agent = supertest(app);

describe("GET/pokemons", () => {
  it("should returns status 200 when token is valid", async () => {
    await createUser();
    const token = await login();
    
    const response = await agent.get("/pokemons").set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("should returns status 401 when token is invalid", async () => {
    const response = await agent.get("/pokemons").set("Authorization", `Bearer invalid}`);
    expect(response.status).toBe(401);
  });
});