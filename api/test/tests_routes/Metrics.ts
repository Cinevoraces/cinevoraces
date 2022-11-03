import type { InjectOptions } from 'fastify';
import type { server } from '../utils/testsType';

export async function ENDPOINTS_METRICS(server: server) {
  describe('METRICS ENDPOINTS', () => {
    const { app, expectedObjects } = server;
    const inject: Record<string, InjectOptions> = {
      getGlobalMetrics: { 
        method: 'GET',
        url: '/metrics',
      },
    };

    test('GET GLOBAL METRICS', async () => {
      const res = await app.inject(inject.getGlobalMetrics);
      expect(res.statusCode).toEqual(200);
      expect(await res.json()).toEqual(expectedObjects.metrics);
    });
  });
}
