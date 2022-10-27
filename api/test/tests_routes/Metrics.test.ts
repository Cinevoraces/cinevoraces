import type { InjectOptions } from 'fastify';
import { build } from '../utils/helper';

describe('METRICS ENDPOINTS', () => {
  const { app, expectedObjects } = build();
  const inject: Record<string, InjectOptions> = {
    getGlobalMetrics: { 
      method: 'GET',
      url: '/metrics',
    },
    getUsersMetrics: { 
      method: 'GET',
      url: '/metrics/users',
    }
  };

  test('GET GLOBAL METRICS', async () => {
    const res = await app.inject(inject.getGlobalMetrics);
    expect(res.statusCode).toEqual(200);
    expect(await res.json()).toEqual(expectedObjects.metricsGlobal);
  });

  test('GET USERS METRICS', async () => {
    const res_1 = await app.inject(inject.getUsersMetrics);
    const res_2 = await app.inject({
      ...inject.getUsersMetrics,
      query: 'filter[user_id]=1',
    });

    expect(res_1.statusCode).toEqual(200);
    expect(res_2.statusCode).toEqual(200);
    expect(await res_1.json()).toEqual(expect.arrayContaining([expectedObjects.metricsUser]));
    expect(await res_2.json()[0]).toEqual(expectedObjects.metricsUser);
  });
});
