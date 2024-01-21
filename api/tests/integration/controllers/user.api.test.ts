import { buildTestServer } from '../../utils/buildTestServer';
import { logUser } from '../../utils/logUser';

describe('API - User controller', () => {
    const server = buildTestServer();
    let userHeaders = {};

    beforeAll(async () => {
        server.fastify.ready();
        userHeaders = await logUser(server.fastify);
    });
    afterAll(() => server.fastify.close());

    it('GET /users/me - should return "me" object', async () => {
        const { statusCode, json } = await server.fastify.inject({
            method: 'GET',
            url: '/users/me',
            ...userHeaders,
        });

        const res: Array<Record<string, unknown>> = await json();
        const user = res[0];

        expect(res.length).toEqual(1);
        expect(statusCode).toEqual(200);
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('mail');
    });

    it('GET /users - should return "users" array', async () => {
        const { statusCode, json } = await server.fastify.inject({
            method: 'GET',
            url: '/users',
        });

        const res = await json();

        expect(statusCode).toEqual(200);
        for (const user of res) {
            expect(user).toHaveProperty('id');
            expect(user).not.toHaveProperty('password');
            expect(user).not.toHaveProperty('mail');
        }
    });

    it('PUT /users - should update user', async () => {
        const { statusCode } = await server.fastify.inject({
            method: 'PUT',
            url: '/users',
            ...userHeaders,
            payload: {
                password: process.env.TEST_PASS,
                update_user: {
                    password: process.env.TEST_PASS,
                },
            },
        });

        expect(statusCode).toEqual(201);
    });
});
