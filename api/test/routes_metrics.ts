import type TestServer from './TestServer';

export async function ROUTES_METRICS(server: TestServer) {
  describe('METRICS ENDPOINTS', () => {
    
    test('GET GLOBAL METRICS', async () => {
      const SUCCESSFULL_METRICS_GET = await server.RequestMetrics();

      expect(SUCCESSFULL_METRICS_GET.statusCode).toEqual(200);
      expect(SUCCESSFULL_METRICS_GET.res).toEqual(server.expected.metrics);
    });
  });
}
