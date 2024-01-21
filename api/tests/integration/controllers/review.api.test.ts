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

    it('PUT /reviews/:movieId - should create a review', async () => {
        const { statusCode, json } = await server.fastify.inject({
            method: 'PUT',
            url: '/reviews/1',
            ...userHeaders,
            payload: {
                rating: 5,
                comment: 'test',
            },
        });
    });
});
