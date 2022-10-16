import type { resCookies } from '../types';
import { build } from '../helper';
import { faker } from '@faker-js/faker';
import prisma from '../utils/prisma';
import bcrypt from 'bcrypt';
import createUser from '../utils/createUser';

describe('Auth routes test', () => {
  const app = build();
  let user: Awaited<ReturnType<typeof createUser>>;
  const password = 'password1234';
  const testUser = {
    pseudo: faker.internet.userName(),
    mail: faker.internet.email(),
    password: password,
  };
  
  beforeAll(async () => {
    const encryptedPassword = await bcrypt.hash(password, 10);
    user = await createUser({
      password: encryptedPassword,
    });
  });

  afterAll(async () => {
    user.remove();
  });

  test('POST /register', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/register',
      payload: { ...testUser },
    });
    await prisma.user.delete({
      where: { pseudo: testUser.pseudo },
    });
    expect(res.statusCode).toEqual(201);
  });

  test('POST /register - Wrong password format', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/register',
      payload: { ...testUser, password: 'testercédouter' },
    });
    expect(res.statusCode).toEqual(422);
  });

  test('POST /login', async () => {
    const login = await app.inject({
      method: 'POST',
      url: '/login',
      payload: { pseudo: user.data.pseudo, password },
    });

    expect(login.statusCode).toEqual(200);
    expect(await login.json()).toEqual(expect.objectContaining({
      user: expect.objectContaining({
        id: expect.any(String),
        pseudo: expect.any(String),
        mail: expect.any(String),
        role: expect.any(String),
        avatar_url: expect.any(String),
      }),
      token: expect.any(String),
      response: expect.any(String)
    }));
    expect(login.cookies).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'refresh_token', value: expect.any(String) }),
      ])
    );
  });

  test('GET /refresh', async () => {
    const login = await app.inject({
      method: 'POST',
      url: '/login',
      payload: { pseudo: user.data.pseudo, password },
    });

    const cookieName = (login.cookies[0] as resCookies).name;
    const cookieValue = (login.cookies[0] as resCookies).value;
    
    const refresh = await app.inject({
      method: 'GET',
      url: '/refresh',
      headers: {
        cookie: `${cookieName}=${cookieValue}`,
      },
    });

    expect(refresh.statusCode).toEqual(200);
    expect(await refresh.json()).toEqual(expect.objectContaining({
      user: expect.objectContaining({
        id: expect.any(String),
        pseudo: expect.any(String),
        mail: expect.any(String),
        role: expect.any(String),
        avatar_url: expect.any(String),
      }),
      token: expect.any(String),
      response: expect.any(String)
    }));
    expect(refresh.cookies).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'refresh_token', value: expect.any(String) }),
      ])
    );
  });
});
