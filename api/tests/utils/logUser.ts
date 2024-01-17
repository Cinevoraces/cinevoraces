import type { FastifyInstance } from 'fastify';

export const logUser = async (instance: FastifyInstance) => {
    const { statusCode, json, cookies } = await instance.inject({
        method: 'POST',
        url: '/login',
        payload: {
            pseudo: process.env.TEST_USER,
            password: process.env.TEST_PASS,
        },
    });

    const res = await json();

    if (statusCode === 200) {
        const refreshToken =
            (cookies[0] as Record<string, string>).name + '=' + (cookies[0] as Record<string, string>).value;
        const accessToken = await res.token;

        return { refreshToken, accessToken };
    } else {
        return;
    }
};
