import type { FastifyPluginCallback } from 'fastify';
import type { FastifyStaticOptions } from '@fastify/static';
import FastifyStatic from '@fastify/static';
import plugin from 'fastify-plugin';

/**
 * @package @fastify/static
 * @description Fastify plugin for serving static files.
 * @see https://github.com/fastify/fastify-static
 */
export default plugin((async (fastify, opts: FastifyStaticOptions, done) => {
    // Check if plugin is already registered
    if (fastify.hasDecorator('sendFile')) return fastify.log.warn('@fastify/static already registered');
    fastify.register(FastifyStatic, { root: '/', ...opts });
    done();
}) as FastifyPluginCallback);
