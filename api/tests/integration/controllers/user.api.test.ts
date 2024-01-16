import { buildTestServer } from '../../utils/buildTestServer';
import { logUser } from '../../utils/logUser';

describe('API - User controller', () => {
    const server = buildTestServer();

    beforeAll(() => server.fastify.ready());
    afterAll(() => server.fastify.close());

    it('users/me - should return "me" object', async () => {
        const { refreshToken, accessToken } = await logUser(
            server.fastify,
            process.env.TEST_USER,
            process.env.TEST_PASS,
        );

        const { statusCode, json } = await server.fastify.inject({
            method: 'GET',
            url: '/users/me',
            headers: { Authorization: `Bearer ${accessToken}` },
            cookies: { refreshToken },
        });

        const res = await json();

        console.log(res);
        expect(statusCode).toEqual(200);
    });
});
