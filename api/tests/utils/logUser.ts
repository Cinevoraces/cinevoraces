import type { FastifyInstance } from 'fastify';

export const logUser = async (instance: FastifyInstance) => {
    const {
        statusCode,
        json,
        cookies: resCookies,
    } = await instance.inject({
        method: 'POST',
        url: '/auth/login',
        payload: {
            pseudo: process.env.TEST_USER,
            password: process.env.TEST_PASS,
        },
    });

    const res = await json();

    if (statusCode === 200) {
        const cookies = {
            refreshToken:
                (resCookies[0] as Record<string, string>).name + '=' + (resCookies[0] as Record<string, string>).value,
        };
        const accessToken = await res.token;
        const headers = { Authorization: `Bearer ${accessToken}` };

        return { headers, cookies };
    } else {
        throw new Error(res.message);
    }
};
