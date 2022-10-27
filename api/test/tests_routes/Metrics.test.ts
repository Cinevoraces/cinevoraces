import type { InjectOptions } from 'fastify';
import { build } from '../utils/helper';

describe('METRICS ENDPOINTS', () => {
  const { app, expectedObjects } = build();
  const inject: Record<string, InjectOptions> = {
    getGlobalMetrics: { 
      method: 'GET',
      url: '/metrics',
    },
  };

  test('GET GLOBAL METRICS', async () => {
    const res = await app.inject(inject.getGlobalMetrics);
    expect(res.statusCode).toEqual(200);
    expect(await res.json()).toEqual(expectedObjects.metricsGlobal);
  });
});
