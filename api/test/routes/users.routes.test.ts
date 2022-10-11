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
  const userObjectWithMoviesAndReviews = expect.objectContaining({
    movies: expect.anything(),
    reviews: expect.anything(),
  });
  const userObjectWithMetrics = expect.objectContaining({
    metrics: expect.anything(),
  });
  let user: Awaited<ReturnType<typeof createUser>>
  let admin: Awaited<ReturnType<typeof createUser>>
  let userToDelete: Awaited<ReturnType<typeof createUser>>
  const password = "password1234";
  
  beforeAll(async () => {
    const encryptedPassword = await bcrypt.hash(password, 10);
    user = await createUser({
      password: encryptedPassword,
    });
    admin = await createUser({
      password: encryptedPassword,
      role: "admin",
    });
    userToDelete = await createUser();
  })

  afterAll(async () => {
    user.remove()
    admin.remove()
  })
  
  test("GET /users", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/users",
    });
    expect(res.statusCode).toEqual(200);
    expect(await res.json()).toEqual(expect.arrayContaining([userObject]));
  });

  test("GET /users populated with movies and reviews", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/users",
      query: "pop[movies]=true&pop[reviews]=true",
    });
    expect(res.statusCode).toEqual(200);
    expect(await res.json()).toEqual(expect.arrayContaining([userObjectWithMoviesAndReviews]));
  });

  
  test("GET /users/1", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/users/1",
    });
    expect(res.statusCode).toEqual(200);
    expect(await res.json()).toEqual(userObject);
  });

  test("GET /users/1 with movies and reviews", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/users/1",
      query: "pop[movies]=true&pop[reviews]=true",
    });

    expect(res.statusCode).toEqual(200);
    expect(await res.json()).toEqual(userObjectWithMoviesAndReviews);
  });

  test("GET /users/1 populated with metrics", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/users/1",
      query: "pop[metrics]=true",
    });
    expect(res.statusCode).toEqual(200);
    expect(await res.json()).toEqual(userObjectWithMetrics);
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

  test("DELETE /users/:id", async () => {  
    const login = await app.inject({
      method: "POST",
      url: "/login",
      payload: { pseudo: admin.data.pseudo, password },
    });
    const loginRes = await login.json();

    const res = await app.inject({
      method: "DELETE",
      url: `/users/${userToDelete.data.id}`,
      headers: {
        authorization: `Bearer ${loginRes.token}`,
      },
      payload: { password },
    });

    expect(res.statusCode).toEqual(200);
  });
});
