import type { FastifyPluginCallback } from 'fastify';
import type { FastifyJWTOptions } from '@fastify/jwt';
import FastifyJwt from '@fastify/jwt';
import plugin from 'fastify-plugin';

/**
 * @package @fastify/jwt
 * @description Fastify plugin for handling JWT strategy.
 * @see https://github.com/fastify/fastify-jwt
 */
export default plugin((async (fastify, opts: FastifyJWTOptions, done) => {
    // Check if plugin is already registered
    if (fastify.hasDecorator('jwt')) return fastify.log.warn('@fastify/jwt already registered');

    fastify.register(FastifyJwt, {
        secret: process.env.JWT_SECRET,
        cookie: {
            cookieName: 'refresh_token',
            signed: true,
        },
        ...opts,
    });

    done();
}) as FastifyPluginCallback);
