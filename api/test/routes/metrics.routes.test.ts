import { build } from '../helper';

describe('Metrics routes test', () => {
  const app = build();
  const globalMetricsObject = expect.objectContaining({
    seasons_count: expect.any(Number),
    movies_count: expect.any(Number),
    countries_count: expect.any(Number),
  });
  const userMetricsObject = expect.objectContaining({
    propositions_count: expect.any(Number),
    comments_count: expect.any(Number),
    likes_count: expect.any(Number),
    watchlist_count: expect.any(Number),
    ratings_count: expect.any(Number),
  });
  const userMetricsArray = expect.arrayContaining([
    expect.objectContaining({
      id: expect.any(Number),
      propositions_count: expect.any(Number),
      comments_count: expect.any(Number),
      likes_count: expect.any(Number),
      watchlist_count: expect.any(Number),
      ratings_count: expect.any(Number),
    })
  ]);

  test('GET /metrics', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/metrics',
    });

    expect(res.statusCode).toEqual(200);
    expect(await res.json()).toEqual(globalMetricsObject);
  });

  test('GET /metrics/users', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/metrics/users',
    });

    expect(res.statusCode).toEqual(200);
    expect(await res.json()).toEqual(userMetricsArray);
  });

  test('GET /metrics/users/:id', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/metrics/users/2',
    });

    expect(res.statusCode).toEqual(200);
    expect(await res.json()).toEqual(userMetricsObject);
  });
});
