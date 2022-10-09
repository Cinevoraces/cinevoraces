import { build } from "../helper";
import bcrypt from "bcrypt";
import createUser from "../utils/createUser";

describe("Users routes test", () => {
  const app = build();
  const userObject = expect.objectContaining({
    id: expect.any(Number),
    pseudo: expect.any(String),
    mail: expect.any(String),
    avatar_url: expect.any(String),
    role: expect.any(String),
    created_at: expect.anything(),
    // updated_at: null,
  });
  let user: Awaited<ReturnType<typeof createUser>>
  const password = "password1234";
  
  beforeAll(async () => {
    const encryptedPassword = await bcrypt.hash(password, 10);
    user = await createUser({
      password: encryptedPassword,
    })
  })

  afterAll(async () => {
    user.remove()
  })
  
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

  test("PUT /users", async () => {  
    const login = await app.inject({
      method: "POST",
      url: "/login",
      payload: { pseudo: user.data.pseudo, password },
    });
    const loginRes = await login.json();

    const res = await app.inject({
      method: "PUT",
      url: "/users",
      headers: {
        authorization: `Bearer ${loginRes.token}`,
      },
      payload: {
        password,
        update_user: {
          pseudo: "IHateTests",
          password: "password123456789",
        },
      },
    });

    expect(res.statusCode).toEqual(200);
  });
});
