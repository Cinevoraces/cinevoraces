import { build } from '../helper';

describe('Movies routes test', () => {
  const app = build();
  const movieObject = expect.objectContaining({
    id: expect.any(Number),
    french_title: expect.any(String),
    original_title: expect.any(String),
    poster_url: expect.any(String),
    directors: expect.arrayContaining([expect.any(String)]),
    release_date: expect.any(String),
    runtime: expect.any(Number),
    casting: expect.arrayContaining([expect.any(String)]),
    presentation: expect.any(String),
    is_published: expect.any(Boolean),
    publishing_date: expect.any(String),
    user_id: expect.any(Number),
    season_id: expect.any(Number),
    created_at: expect.anything(),
    // updated_at: null,
  });

  test('GET /movies', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/movies',
    });

    expect(res.statusCode).toEqual(200);
    expect(await res.json()).toEqual(expect.arrayContaining([movieObject]));
  });

  test('GET /movies with published/season filters', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/movies',
      query: 'filter[is_published]=true&filter[season_id]=3',
    });

    expect(res.statusCode).toEqual(200);
    expect(await res.json()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          is_published: true,
          season_id: 3,
        }),
      ])
    );
  });

  test('GET /movies with user id filter', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/movies',
      query: 'filter[user_id]=1',
    });

    expect(res.statusCode).toEqual(200);
    expect(await res.json()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          user_id: 1,
        }),
      ])
    );
  });

  test('GET /movies with bad filters', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/movies',
      query: 'filter[jambon]=true',
    });

    expect(res.statusCode).toEqual(200);
    expect(await res.json()).toEqual(expect.arrayContaining([movieObject]));
  });

  test('GET /movies/1', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/movies/1',
    });

    expect(res.statusCode).toEqual(200);
    expect(await res.json()).toEqual(movieObject);
  });
});
