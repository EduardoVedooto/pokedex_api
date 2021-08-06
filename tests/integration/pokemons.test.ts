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

describe("GET/pokemons/:id", () => {
  it("should returns status 200 when token is valid", async () => {
    await createUser();
    const token = await login();
    
    const response = await agent.get("/pokemons/1").set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("should returns status 401 when token is invalid", async () => {
    const response = await agent.get("/pokemons/1").set("Authorization", `Bearer invalid}`);
    expect(response.status).toBe(401);
  });

  it("should returns status 400 when id isn't a number", async () => {
    await createUser();
    const token = await login();
    
    const response = await agent.get("/pokemons/INVALID").set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it("should returns status 400 when id isn't from a valid pokémon", async () => {
    await createUser();
    const token = await login();
    
    const response = await agent.get("/pokemons/-1").set("Authorization", `Bearer ${token}`);
    expect(response.text).toBe("ID doesn't match with any pokémon from database");
    expect(response.status).toBe(400);
  });
});

describe("POST/my-pokemons -> Add", () => {
  it("should returns status 200 when token is valid", async () => {
    await createUser();
    const token = await login();
    
    const response = await agent.post("/my-pokemons/1/add").set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("should returns status 401 when token is invalid", async () => {
    const response = await agent.post("/my-pokemons/1/add").set("Authorization", `Bearer INVALID}`);
    expect(response.status).toBe(401);
  });

  it("should returns status 400 when id isn't a number", async () => {
    await createUser();
    const token = await login();
    
    const response = await agent.post("/my-pokemons/INVALID_ID/add").set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it("should returns status 400 when id isn't from a valid pokémon", async () => {
    await createUser();
    const token = await login();
    
    const response = await agent.post("/my-pokemons/-1/add").set("Authorization", `Bearer ${token}`);
    expect(response.text).toBe("ID doesn't match with any pokémon from database");
    expect(response.status).toBe(400);
  });
});

describe("POST/my-pokemons -> Remove", () => {
  it("should returns status 200 when token is valid", async () => {
    await createUser();
    const token = await login();
    
    const response = await agent.post("/my-pokemons/1/remove").set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("should returns status 401 when token is invalid", async () => {
    const response = await agent.post("/my-pokemons/1/remove").set("Authorization", `Bearer INVALID}`);
    expect(response.status).toBe(401);
  });

  it("should returns status 400 when id isn't a number", async () => {
    await createUser();
    const token = await login();
    
    const response = await agent.post("/my-pokemons/INVALID_ID/remove").set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  it("should returns status 400 when id isn't from a valid pokémon", async () => {
    await createUser();
    const token = await login();
    
    const response = await agent.post("/my-pokemons/-1/remove").set("Authorization", `Bearer ${token}`);
    expect(response.text).toBe("ID doesn't match with any pokémon from database");
    expect(response.status).toBe(400);
  });
});