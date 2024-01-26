import { buildTestServer } from '../../utils/buildTestServer';

describe('API - Metrics controller', () => {
    const server = buildTestServer();

    beforeAll(async () => server.fastify.ready());
    afterAll(() => server.fastify.close());

    it('API:GET/metrics', async () => {
        const { statusCode } = await server.fastify.inject({
            method: 'GET',
            url: '/metrics',
        });
        expect(statusCode).toBe(200);
    });
});
