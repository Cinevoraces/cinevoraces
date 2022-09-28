import { build } from "../helper";
import { faker } from "@faker-js/faker";
import prisma from "../utils/prisma";

describe("Users routes test", () => {
  const app = build();
  const testUser = {
    pseudo: faker.internet.userName(),
    mail: faker.internet.email(),
    password: "password1234",
  };
  const userObject = expect.objectContaining({
    id: expect.any(Number),
    pseudo: expect.any(String),
    mail: expect.any(String),
    avatar_url: expect.any(String),
    role: expect.any(String),
    created_at: expect.anything(),
    // updated_at: null,
  });

  test("GET /users", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/users",
    });
    expect(res.statusCode).toEqual(200);
    expect(await res.json()).toEqual(expect.arrayContaining([userObject]));
  });

  test("GET /users/1", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/users/1",
    });
    expect(res.statusCode).toEqual(200);
    expect(await res.json()).toEqual(userObject);
  });

  test.skip("PUT /users/:id", async () => {
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
    const id = login.json().user.id;
    const res = await app.inject({
      method: "PUT",
      url: `/users/${id}`,
      headers: {
        cookie: `token=${(login.cookies[0] as any).value}`,
      },
      payload: {
        user: {
          ...testUser,
          updated_password: "password123456789",
        },
      },
    });

    console.log(res.body);

    // await prisma.user.delete({
    //   where: { pseudo: testUser.pseudo },
    // });

    expect(res.statusCode).toEqual(200);
  });
});
