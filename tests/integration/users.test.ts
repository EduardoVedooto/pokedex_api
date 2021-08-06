import supertest from "supertest";

import app, { init } from "../../src/app";
import { IUser, IUserLogin } from "../../src/types/User";
import { createUser, userDefault } from "../factories/userFactory";
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

const userSignUp:IUser = {
  email: "test@email.com",
  password: "123456",
  confirmPassword: "123456"
}

const userSignIn:IUserLogin = {
  email: "test@email.com",
  password: "123456",
}

describe("POST /sign-up", () => {
  it("should responds \"Created\" and status 201 when all params are valid", async () => {
    const response = await agent.post("/sign-up").send(userDefault);
    expect(response.text).toEqual("Created");
    expect(response.status).toBe(201);
  });

  it("should responds status 409 when user is already registered", async () => {
    await createUser();
    const response = await agent.post("/sign-up").send(userSignUp);
    expect(response.status).toBe(409);
  });

  it("should responds status 400 when email is invalid", async () => {
    const response = await agent.post("/sign-up").send({...userSignUp, email: ''});
    expect(response.status).toBe(400);
  });

  it("should responds status 400 when password is less than 6 characters", async () => {
    const response = await agent.post("/sign-up").send({...userSignUp, password: '123'});
    expect(response.status).toBe(400);
  });

  it("should responds status 400 when password and confirmPassword don't match", async () => {
    const response = await agent.post("/sign-up").send({...userSignUp, password: '654321'});
    expect(response.status).toBe(400);
  });
});

describe("POST /sign-in", () => {
  it("should responds status 200 with a token when params are correct", async () => {
    await createUser();
    const response = await agent.post("/sign-in").send(userSignIn);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({
      token: expect.any(String)
    }))
  });

  it("should responds status 400 when email is invalid", async () => {
    await createUser();
    const response = await agent.post("/sign-in").send({...userSignIn, email:'teste'});
    expect(response.status).toBe(400);
  });

  it("should responds status 400 when password is invalid", async () => {
    await createUser();
    const response = await agent.post("/sign-in").send({...userSignIn, password:'123'});
    expect(response.status).toBe(400);
  });

  it("should responds status 401 when email and password don't match", async () => {
    await createUser();
    const response = await agent.post("/sign-in").send({...userSignIn, password:'654321'});
    expect(response.status).toBe(401);
  });
});