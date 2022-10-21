import type { InjectOptions } from 'fastify';
import { build } from '../helper';
import { faker } from '@faker-js/faker';
import prisma from '../utils/prisma';
import bcrypt from 'bcrypt';
import expectedObjects from '../expectedObjects';

describe('Auth routes test', () => {
  const { app, res } = build();
  const testUser = {
    pseudo: faker.internet.userName(),
    mail: faker.internet.email(),
    password: res.password,
  };
  const inject: Record<string, InjectOptions> = {
    register: { method: 'POST', url: '/register' },
    login: { method: 'POST', url: '/login' },
    refresh: { method: 'GET', url: '/refresh' }
  };
  
  beforeAll(async () => {
    const hashedPassword = await bcrypt.hash(res.password, 10);
    res.users[0] = await res.createUser({ password: hashedPassword });
  });

  afterAll(async () => {
    res.users[0].remove();
  });

  test('POST /register - Register function', async () => {
    const wrongPasswordFormat = await app.inject({
      ...inject.register,
      payload: { ...testUser, password: 'testercédouter' },
    });
    const successfullRegister = await app.inject({
      ...inject.register,
      payload: { ...testUser },
    });
    await prisma.user.delete({ where: { pseudo: testUser.pseudo } });

    expect(wrongPasswordFormat.statusCode).toEqual(422);
    expect(successfullRegister.statusCode).toEqual(201);
  });

  test('POST /login - Login function', async () => {
    const login = await app.inject({
      ...inject.login,
      payload: { pseudo: res.users[0].data.pseudo, password: res.password },
    });

    expect(login.statusCode).toEqual(200);
    expect(await login.json()).toEqual(expectedObjects.loginResponse);
    expect(login.cookies).toEqual(expect.arrayContaining([expectedObjects.refreshToken]));
  });

  test('GET /refresh - Refresh token function', async () => {
    const login = await app.inject({
      ...inject.login,
      payload: { pseudo: res.users[0].data.pseudo, password: res.password },
    });

    const cookieName = (login.cookies[0] as Record<string, string>).name;
    const cookieValue = (login.cookies[0] as Record<string, string>).value;
    const refresh = await app.inject({
      ...inject.refresh,
      headers: {
        cookie: `${cookieName}=${cookieValue}`,
      },
    });

    expect(refresh.statusCode).toEqual(200);
    expect(await refresh.json()).toEqual(expectedObjects.loginResponse);
    expect(refresh.cookies).toEqual(expect.arrayContaining([expectedObjects.refreshToken]));
  });
});
