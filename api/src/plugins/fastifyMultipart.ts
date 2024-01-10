import type { FastifyPluginCallback } from 'fastify';
import FastifyMultipart from '@fastify/multipart';
import plugin from 'fastify-plugin';

/**
 * @package @fastify/multipart
 * @description Fastify plugin for handling multipart/form-data requests.
 * @see https://github.com/fastify/fastify-multipart
 */
export default plugin((async (fastify, opts, done) => {
    // Check if plugin is already registered
    if (fastify.hasDecorator('multipart')) return fastify.log.warn('@fastify/multipart already registered');

    fastify.register(FastifyMultipart, {
        // addToBody: true,
        // sharedSchemaId: 'MultipartSchema',
        // limits: {
        //   fieldNameSize: 100,
        //   fieldSize: 1000000,
        //   fields: 10,
        //   fileSize: 1000000,
        //   files: 1,
        //   headerPairs: 2000,
        // },
        ...opts,
    });

    done();
}) as FastifyPluginCallback);
