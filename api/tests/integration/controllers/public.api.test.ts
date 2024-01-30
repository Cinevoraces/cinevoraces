import { buildTestServer } from '../../utils/buildTestServer';

describe('API - Public controller', () => {
    const server = buildTestServer();

    beforeAll(async () => server.fastify.ready());
    afterAll(() => server.fastify.close());

    it('API:GET/public/:docType/:entityId - should return a poster', async () => {
        const response = await server.fastify.inject({
            method: 'GET',
            url: '/public/poster/116',
        });

        expect(response.statusCode).toEqual(200);
        expect(response.headers['content-type']).toEqual('image/jpeg');
    });

    it('API:GET/public/:docType/:entityId - should return an avatar', async () => {
        const response = await server.fastify.inject({
            method: 'GET',
            url: '/public/avatar/2',
        });

        expect(response.statusCode).toEqual(200);
        expect(response.headers['content-type']).toEqual('image/jpeg');
    });
});
