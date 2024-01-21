import type { InjectOptions } from 'fastify';
import { buildTestServer } from '../../utils/buildTestServer';
import { logUser } from '../../utils/logUser';

describe('API - Season controller', () => {
    const server = buildTestServer();
    let userHeaders: InjectOptions;

    beforeAll(async () => {
        server.fastify.ready();
        userHeaders = await logUser(server.fastify);
    });
    afterAll(() => server.fastify.close());

    it('API:GET/seasons', async () => {
        const { statusCode } = await server.fastify.inject({
            method: 'GET',
            url: '/seasons',
            ...userHeaders,
        });
        expect(statusCode).toBe(200);
    });

    it('API:GET/seasons/:number', async () => {
        const { statusCode } = await server.fastify.inject({
            method: 'GET',
            url: '/seasons/1',
            ...userHeaders,
        });
        expect(statusCode).toBe(200);
    });
});
