import { build } from "../helper";
import { faker } from "@faker-js/faker";
import prisma from "../utils/prisma";
import bcrypt from "bcrypt";
import createUser from "../utils/createUser";

describe("Auth routes test", () => {
  const app = build();
  let user: Awaited<ReturnType<typeof createUser>>
  const password = "password1234";
  const testUser = {
    pseudo: faker.internet.userName(),
    mail: faker.internet.email(),
    password: password,
  };
  
  beforeAll(async () => {
    const encryptedPassword = await bcrypt.hash(password, 10);
    user = await createUser({
      password: encryptedPassword,
    })
  })

  afterAll(async () => {
    user.remove()
  })

  test("POST /register", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/register",
      payload: { ...testUser },
    });
    await prisma.user.delete({
      where: { pseudo: testUser.pseudo },
    });
    expect(res.statusCode).toEqual(201);
  });

  test("POST /register - Wrong password format", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/register",
      payload: { ...testUser, password: "testercédouter" },
    });
    expect(res.statusCode).toEqual(422);
  });

  test("POST /login", async () => {
    const login = await app.inject({
      method: "POST",
      url: "/login",
      payload: { pseudo: user.data.pseudo, password },
    });

    expect(login.statusCode).toEqual(200);
    expect(login.cookies).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "token", value: expect.any(String) }),
        expect.objectContaining({ name: "refreshToken", value: expect.any(String) }),
      ])
    );
  });

  test("GET /refresh", async () => {
    const login = await app.inject({
      method: "POST",
      url: "/login",
      payload: { pseudo: user.data.pseudo, password },
    });

    const refresh = await app.inject({
      method: "GET",
      url: "/refresh",
      headers: {
        cookie: `refreshToken=${(login.cookies[1] as any).value}`,
      },
    });

    expect(refresh.statusCode).toEqual(200);
  });
});
