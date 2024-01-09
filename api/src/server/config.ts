import { parserOpts } from './parserOpts';
import type { ServerConfig } from './server';

/**
 * For more information on the dependencies, see:
 * - **\@fastify/cookie** - https://github.com/fastify/fastify-cookie
 * - **\@fastify/cors** - https://github.com/fastify/fastify-cors
 * - **\@fastify/jwt** - https://github.com/fastify/fastify-jwt
 * - **\@fastify/multipart** - https://github.com/fastify/fastify-multipart
 * - **\@fastify/static** - https://github.com/fastify/fastify-static
 */
export const defaultConfig: ServerConfig = {
    logger: true,
    parserOpts,
    dependenciesOpts: {
        pg: {
            user: process.env.POSTGRES_USER,
            database: process.env.POSTGRES_DB,
            password: process.env.POSTGRES_PASSWORD,
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
        },
        '@fastify/cookie': {
            secret: process.env.COOKIE_SECRET,
        },
        '@fastify/cors': {
            origin: ['http://localhost:3000'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true,
        },
        '@fastify/jwt': {
            secret: process.env.JWT_SECRET,
            cookie: {
                cookieName: 'refresh_token',
                signed: true,
            },
        },
        '@fastify/static': {
            root: '/',
        },
    },
};

export const testConfig: ServerConfig = {
    ...defaultConfig,
};
