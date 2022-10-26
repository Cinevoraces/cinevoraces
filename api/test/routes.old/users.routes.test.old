import type { InjectOptions } from 'fastify';
import { build } from '../helper';
import bcrypt from 'bcrypt';
import expectedObjects from '../expectedObjects';

describe('Users routes test', () => {
  const { app, res } = build();
  const inject: Record<string, InjectOptions> = {
    login: { method: 'POST', url: '/login' },
    loginAdmin: { method: 'POST', url: '/login' },
    allUsers: { method: 'GET', url: '/users' },
    userById: { method: 'GET', url: '/users/1' },
    putUserByToken: { method: 'PUT', url: '/users' },
  };
  
  beforeAll(async () => {
    const encryptedPassword = await bcrypt.hash(res.password, 10);
    res.users[0] = await res.createUser({ password: encryptedPassword });
    res.users[1] = await res.createUser({ password: encryptedPassword, role: 'admin' });
    res.users[2] = await res.createUser();
    inject.login = { 
      ...inject.login, 
      payload: { 
        pseudo: res.users[0].data.pseudo, 
        password: res.password 
      } 
    };
    inject.loginAdmin = { 
      ...inject.loginAdmin, 
      payload: { 
        pseudo: res.users[1].data.pseudo, 
        password: res.password 
      } 
    };
  });

  afterAll(async () => {
    res.users[0].remove();
    res.users[1].remove();
  });
  
  test('GET /users - Get all Users', async () => {
    const getAllUsers = await app.inject(inject.allUsers);
    const populator_movies_reviews = await app.inject({
      ...inject.allUsers,
      query: 'pop[movies]=true&pop[reviews]=true',
    });

    expect(getAllUsers.statusCode).toEqual(200);
    expect(await getAllUsers.json()).toEqual(expect.arrayContaining([expectedObjects.user]));
    expect(populator_movies_reviews.statusCode).toEqual(200);
    expect(await populator_movies_reviews.json()).toEqual(expect.arrayContaining([expectedObjects.userWithMoviesAndReviews]));
  });

  test('GET /users/:id - Get one User by ID', async () => {
    const getOneUser = await app.inject(inject.userById);
    const populator_movies_reviews = await app.inject({
      ...inject.userById,
      query: 'pop[movies]=true&pop[reviews]=true',
    });
    const populator_metrics = await app.inject({
      ...inject.userById,
      query: 'pop[metrics]=true',
    });
  
    expect(getOneUser.statusCode).toEqual(200);
    expect(await getOneUser.json()).toEqual(expectedObjects.user);
    expect(populator_movies_reviews.statusCode).toEqual(200);
    expect(await populator_movies_reviews.json()).toEqual(expectedObjects.userWithMoviesAndReviews);
    expect(populator_metrics.statusCode).toEqual(200);
    expect(await populator_metrics.json()).toEqual(expectedObjects.userWithMetrics);
  });

  test('PUT /users - Modify user by accessToken', async () => {  
    const login = await app.inject(inject.login);
    const user = await login.json();
    inject.putUserByToken = {
      ...inject.putUserByToken,
      headers: { authorization: `Bearer ${user.token}` },
    };

    const putUser = await app.inject({
      ...inject.putUserByToken,
      payload: {
        password: res.password,
        update_user: {
          pseudo: 'IHateTests',
          password: 'password123456789',
        },
      },
    });

    expect(putUser.statusCode).toEqual(200);
  });

  test('DELETE /users/:id - Delete one User by ID', async () => {  
    const adminLogin = await app.inject(inject.loginAdmin);
    const admin = await adminLogin.json();

    const deleteUser = await app.inject({
      method: 'DELETE',
      url: `/users/${res.users[2].data.id}`,
      headers: { authorization: `Bearer ${admin.token}` },
      payload: { password: res.password },
    });

    expect(deleteUser.statusCode).toEqual(200);
  });
});
