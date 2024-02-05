import { parserOpts, type ServerOpts } from '@src/classes/Server';

/**
 * For more information on the dependencies, see:
 * - **\@fastify/cookie** - https://github.com/fastify/fastify-cookie
 * - **\@fastify/cors** - https://github.com/fastify/fastify-cors
 * - **\@fastify/jwt** - https://github.com/fastify/fastify-jwt
 * - **\@fastify/multipart** - https://github.com/fastify/fastify-multipart
 * - **\@fastify/static** - https://github.com/fastify/fastify-static
 */
export const defaultConfig: ServerOpts = {
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
        '@fastify/rate-limit': {
            global: true,
            hook: 'preHandler',
            max: 1000,
            timeWindow: 1000 * 60,
        },
        '@fastify/static': {
            root: '/',
        },
        '@fastify/swagger': {
            swagger: {
                info: {
                    title: 'Cinévoraces API',
                    description: 'API Documentation',
                    version: '3',
                },
                host: 'localhost',
                schemes: ['http'],
                consumes: ['application/json', 'multipart/form-data'],
                produces: ['application/json'],
                tags: [
                    { name: 'Admin', description: 'Admin API' },
                    { name: 'Authentication', description: 'Authentication API' },
                    { name: 'Public', description: 'Public files API' },
                    { name: 'Episodes', description: 'Episodes API' },
                    { name: 'Metrics', description: 'Metrics API' },
                    { name: 'Movies', description: 'Movies API' },
                    { name: 'Reviews', description: 'Reviews API' },
                    { name: 'Seasons', description: 'Seasons API' },
                    { name: 'Users', description: 'Users API' },
                ],
            },
        },
        '@fastify/swagger-ui': {
            routePrefix: '/swagger',
            uiConfig: {
                docExpansion: 'list',
                deepLinking: false,
                tryItOutEnabled: false,
            },
        },
    },
};

export const testConfig: ServerOpts = {
    ...defaultConfig,
    logger: false,
};

export const rateLimit = {
    loginAttempts: {
        max: 5,
        timeWindow: 60000 * 15,
    },
    publicFiles: {
        max: 500,
        timeWindow: 6000,
    },
};

export const brevoConfig = {
    apiKey: process.env.BREVO_API_KEY,
    sender: { name: 'Cinévoraces', email: 'cinevoraces@gmail.com' },
};
