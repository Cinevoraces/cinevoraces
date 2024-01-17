import type { FastifyInstance } from 'fastify';

export const logUser = async (instance: FastifyInstance, pseudo: string, password: string) => {
    const { statusCode, json, cookies } = await instance.inject({
        method: 'POST',
        url: '/login',
        payload: { pseudo, password },
    });

    const res = await json();

    console.log(statusCode);

    if (statusCode === 200) {
        const refreshToken =
            (cookies[0] as Record<string, string>).name + '=' + (cookies[0] as Record<string, string>).value;
        const accessToken = await res.token;

        return { refreshToken, accessToken };
    } else {
        return;
    }
};
