import type { InjectOptions } from 'fastify';
import { build } from '../utils/helper';

describe('AUTHENTICATION', () => {
  const { app, res, faker, password, pgClient, expectedObjects } = build();
  const inject: Record<string, InjectOptions> = {
    register: { 
      method: 'POST', 
      url: '/register',
    },
    login: { 
      method: 'POST',
      url: '/login',
    },
    refresh: {
      method: 'GET',
      url: '/refresh',
    },
  };

  test('REGISTER', async () => {
    const testUser = {
      pseudo: faker.internet.userName(),
      mail: faker.internet.email(),
      password: password.default,
    };
    const WrongPasswordFormat = await app.inject({
      ...inject.register,
      payload: { ...testUser, password: 'testercédouter' },
    });

    const SuccessfullRegister = await app.inject({
      ...inject.register,
      payload: { ...testUser },
    });

    // Remove test user from database
    await pgClient.query({
      text: ` DELETE FROM "user"
              WHERE pseudo = $1
              AND mail = $2;`,
      values: [testUser.pseudo, testUser.mail],
    });

    expect(WrongPasswordFormat.statusCode).toEqual(422);
    expect(SuccessfullRegister.statusCode).toEqual(201);
  });

  test('LOGIN', async () => {
    inject.login = {
      ...inject.login, 
      payload: { pseudo: res.users[0].user.pseudo, password: res.users[0].user.password },
    };
    const login = await app.inject({
      ...inject.login,
      payload: { pseudo: res.users[0].user.pseudo, password: res.users[0].user.password },
    });
    expect(login.statusCode).toEqual(200);
    expect(await login.json()).toEqual(expectedObjects.loginResponse);
    expect(login.cookies).toEqual(expect.arrayContaining([expectedObjects.refreshToken]));
  });

  test('REFRESHING TOKEN', async () => {
    const login = await app.inject(inject.login);
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
