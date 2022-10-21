import { build } from '../helper';
import expectedObjects from '../expectedObjects';

describe('Metrics routes test', () => {
  const { app } = build();

  test('GET /metrics - Get global metrics object', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/metrics',
    });

    expect(res.statusCode).toEqual(200);
    expect(await res.json()).toEqual(expectedObjects.metricsGlobal);
  });

  test('GET /metrics/users - Get All Metrics', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/metrics/users',
    });

    expect(res.statusCode).toEqual(200);
    expect(await res.json()).toEqual(expect.arrayContaining([expectedObjects.metricsUser]));
  });

  test('GET /metrics/users/:id - Get one user metrics by ID', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/metrics/users/2',
    });

    expect(res.statusCode).toEqual(200);
    expect(await res.json()).toEqual(expectedObjects.metricsUser);
  });
});
