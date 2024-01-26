import { buildTestServer } from '../../utils/buildTestServer';

describe('API - Movie controller', () => {
    const server = buildTestServer();

    beforeAll(async () => server.fastify.ready());
    afterAll(() => server.fastify.close());

    it('API:GET/movies - should public movies', async () => {
        const { statusCode, json } = await server.fastify.inject({
            method: 'GET',
            url: '/movies',
            query: '?where[is_published]=true',
        });

        const res: Array<Record<string, unknown>> = await json();

        expect(statusCode).toEqual(200);

        for (const m of res) {
            expect(m.is_published).toBeTruthy();
        }
    });

    it('API:GET/movies/random-posters/:count', async () => {
        const { statusCode, json } = await server.fastify.inject({
            method: 'GET',
            url: '/movies/random-posters/5',
        });

        const res: Array<Record<string, unknown>> = await json();

        expect(statusCode).toEqual(200);
        expect(res.length).toEqual(5);
    });
});
