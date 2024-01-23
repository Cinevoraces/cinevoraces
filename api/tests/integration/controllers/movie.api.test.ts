import { buildTestServer } from '../../utils/buildTestServer';
import { logUser } from '../../utils/logUser';

describe('API - Movie controller', () => {
    const server = buildTestServer();
    let userHeaders = {};

    beforeAll(async () => {
        server.fastify.ready();
        userHeaders = await logUser(server.fastify);
    });
    afterAll(() => server.fastify.close());

    it('API:GET/movies - should public movies', async () => {
        const { statusCode, json } = await server.fastify.inject({
            method: 'GET',
            url: '/movies',
        });

        const res: Array<Record<string, unknown>> = await json();

        expect(statusCode).toEqual(200);

        for (const m of res) {
            expect(m.is_published).toBeTruthy();
        }
    });
});
