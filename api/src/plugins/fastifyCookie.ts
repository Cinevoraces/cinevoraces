import type { FastifyPluginCallback } from 'fastify';
import FastifyCookie from '@fastify/cookie';
import plugin from 'fastify-plugin';

/**
 * **Fastify cookie**
 * @description
 * This plugin registers the cookie plugin used to store the refresh token.
 */
const fastifyCookie: FastifyPluginCallback = async (fastify, opts, done) => {
  fastify.register(FastifyCookie, {
    secret: process.env.COOKIE_SECRET,
  });

  done();
};

export default plugin(fastifyCookie);
