import { buildTestServer } from '../../utils/buildTestServer';

describe('API - Public controller', () => {
    const server = buildTestServer();

    beforeAll(async () => server.fastify.ready());
    afterAll(() => server.fastify.close());

    it('API:GET/public/:docType/:entityId - should return an image', async () => {
        const response = await server.fastify.inject({
            method: 'GET',
            url: '/public/1/116',
        });

        expect(response.statusCode).toEqual(200);
        expect(response.headers['content-type']).toEqual('image/jpeg');
    });
});
