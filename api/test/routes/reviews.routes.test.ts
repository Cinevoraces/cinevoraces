import type { InjectOptions } from 'fastify';
import { build } from '../helper';
import bcrypt from 'bcrypt';
import createUser from '../utils/createUser';

describe('Reviews routes test', () => {
  const app = build();
  const password = 'password1234';
  let user: Awaited<ReturnType<typeof createUser>>;
  let admin: Awaited<ReturnType<typeof createUser>>;

  beforeAll(async () => {
    const encryptedPassword = await bcrypt.hash(password, 10);
    user = await createUser({
      password: encryptedPassword,
    });
    admin = await createUser({
      password: encryptedPassword,
      role: 'admin',
    });
  });

  afterAll(async () => {
    user.remove();
    admin.remove();
  });

  test('PUT /reviews/:movieId without body', async () => {
    const login = await app.inject({
      method: 'POST',
      url: '/login',
      payload: { pseudo: user.data.pseudo, password },
    });
    const loginRes = await login.json();

    const res = await app.inject({
      method: 'PUT',
      url: '/reviews/1',
      payload: {},
      headers: {
        authorization: `Bearer ${loginRes.token}`,
      },
    });

    expect(res.statusCode).toEqual(400);
  });

  test('PUT /reviews/:movieId with to much properties', async () => {
    const login = await app.inject({
      method: 'POST',
      url: '/login',
      payload: { pseudo: user.data.pseudo, password },
    });
    const loginRes = await login.json();

    const res = await app.inject({
      method: 'PUT',
      url: '/reviews/1',
      payload: {
        rating: 5,
        comment: 'J\'aime tester des choses (C\'est faux)',
      },
      headers: {
        authorization: `Bearer ${loginRes.token}`,
      },
    });
    expect(res.statusCode).toEqual(400);
  });

  test('POST /reviews/:movieId individual responses', async () => {
    const login = await app.inject({
      method: 'POST',
      url: '/login',
      payload: { pseudo: user.data.pseudo, password },
    });
    const loginRes = await login.json();
    const injectParams: InjectOptions = {
      method: 'PUT',
      url: '/reviews/1',
      headers: {
        authorization: `Bearer ${loginRes.token}`,
      }
    };

    const bookmarkedTest = await app.inject({
      ...injectParams, payload: { bookmarked: true },
    });
    expect(bookmarkedTest.statusCode).toEqual(200);
    expect(await bookmarkedTest.json()).toEqual(expect.objectContaining({
      message: 'Film ajouté à ma liste.',
    }));

    const viewedTest = await app.inject({
      ...injectParams, payload: { viewed: true },
    });
    expect(viewedTest.statusCode).toEqual(200);
    expect(await viewedTest.json()).toEqual(expect.objectContaining({
      message: 'Film marqué comme vu.',
    }));

    const likedTest = await app.inject({
      ...injectParams, payload: { liked: true },
    });
    expect(likedTest.statusCode).toEqual(200);
    expect(await likedTest.json()).toEqual(expect.objectContaining({
      message: 'Film marqué comme aimé.',
    }));

    const ratingTest = await app.inject({
      ...injectParams, payload: { rating: 5 },
    });
    expect(ratingTest.statusCode).toEqual(200);
    expect(await ratingTest.json()).toEqual(expect.objectContaining({
      message: 'Film noté.',
    }));

    const commentTest = await app.inject({
      ...injectParams, payload: { comment: 'Tester c\'est douter' },
    });
    expect(commentTest.statusCode).toEqual(200);
    expect(await commentTest.json()).toEqual(expect.objectContaining({
      message: 'Commentaire ajouté.',
    }));

    const ratingUpdateTest = await app.inject({
      ...injectParams, payload: { rating: 2 },
    });
    expect(ratingUpdateTest.statusCode).toEqual(200);
    expect(await ratingUpdateTest.json()).toEqual(expect.objectContaining({
      message: 'Note mise à jour.',
    }));

    const commentUpdateTest = await app.inject({
      ...injectParams, payload: { comment: 'Tester autant de fois, c\'est plus douter, c\'est un manque de respect!' },
    });
    expect(commentUpdateTest.statusCode).toEqual(200);
    expect(await commentUpdateTest.json()).toEqual(expect.objectContaining({
      message: 'Commentaire mis à jour.',
    }));
  });
});
