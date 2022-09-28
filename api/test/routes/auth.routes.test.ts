import { build } from "../helper";
import { faker } from "@faker-js/faker";
import prisma from "../utils/prisma";

describe("Auth routes test", () => {
  const app = build();
  const testUser = {
    pseudo: faker.internet.userName(),
    mail: faker.internet.email(),
    password: "password1234",
  };

  test("POST /register", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/register",
      payload: { user: { ...testUser } },
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
      payload: {
        user: { ...testUser, password: "testercédouter" },
      },
    });
    expect(res.statusCode).toEqual(422);
  });

  test("POST /login", async () => {
    await app.inject({
      method: "POST",
      url: "/register",
      payload: { user: { ...testUser } },
    });
    const login = await app.inject({
      method: "POST",
      url: "/login",
      payload: {
        user: { pseudo: testUser.pseudo, password: testUser.password },
      },
    });
    await prisma.user.delete({
      where: { pseudo: testUser.pseudo },
    });
    expect(login.statusCode).toEqual(200);
    expect(login.cookies).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "token", value: expect.any(String) }),
        expect.objectContaining({
          name: "refreshToken",
          value: expect.any(String),
        }),
      ])
    );
  });

  test("GET /refresh", async () => {
    await app.inject({
      method: "POST",
      url: "/register",
      payload: { user: { ...testUser } },
    });
    const login = await app.inject({
      method: "POST",
      url: "/login",
      payload: {
        user: { pseudo: testUser.pseudo, password: testUser.password },
      },
    });
    const refresh = await app.inject({
      method: "GET",
      url: "/refresh",
      headers: {
        cookie: `refreshToken=${(login.cookies[1] as any).value}`,
      },
    });
    await prisma.user.delete({
      where: { pseudo: testUser.pseudo },
    });

    expect(refresh.statusCode).toEqual(200);
  });
});
