import type { FastifyPluginCallback } from 'fastify';
import FastifyCookie from '@fastify/cookie';
import plugin from 'fastify-plugin';

/**
 * @package @fastify/cookie
 * @description Fastify plugin for cookie configuration.
 * @see https://github.com/fastify/fastify-cookie
 */
export default plugin((async (fastify, opts, done) => {
    fastify.register(FastifyCookie, {
        secret: process.env.COOKIE_SECRET,
    });

    done();
}) as FastifyPluginCallback);
