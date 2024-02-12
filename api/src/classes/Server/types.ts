import { type FastifyCookieOptions } from '@fastify/cookie';
import { type FastifyCorsOptions } from '@fastify/cors';
import { type FastifyJWTOptions } from '@fastify/jwt';
import { type FastifyMultipartOptions } from '@fastify/multipart';
import { type FastifyRateLimitOptions } from '@fastify/rate-limit';
import { type FastifyStaticOptions } from '@fastify/static';
import { type SwaggerOptions } from '@fastify/swagger';
import { type FastifySwaggerUiOptions } from '@fastify/swagger-ui';
import type { PoolConfig } from 'pg';

export interface DependenciesOpts {
    '@fastify/cookie'?: FastifyCookieOptions;
    '@fastify/rate-limit'?: FastifyRateLimitOptions;
    '@fastify/cors'?: FastifyCorsOptions;
    '@fastify/jwt'?: FastifyJWTOptions;
    '@fastify/multipart'?: FastifyMultipartOptions;
    '@fastify/static'?: FastifyStaticOptions;
    '@fastify/swagger'?: SwaggerOptions;
    '@fastify/swagger-ui'?: FastifySwaggerUiOptions;
    pg?: PoolConfig;
}
