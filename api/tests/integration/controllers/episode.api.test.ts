import type { InjectOptions } from 'fastify';
import { buildTestServer } from '../../utils/buildTestServer';
import { logUser } from '../../utils/logUser';

describe('API - Review controller', () => {
    const server = buildTestServer();
    let userHeaders: InjectOptions;

    beforeAll(async () => {
        server.fastify.ready();
        userHeaders = await logUser(server.fastify);
    });
    afterAll(() => server.fastify.close());

    it('API:GET/episodes', async () => {
        const { statusCode } = await server.fastify.inject({
            method: 'GET',
            url: '/episodes',
            ...userHeaders,
        });
        expect(statusCode).toBe(200);
    });
});
