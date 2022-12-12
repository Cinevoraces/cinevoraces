import type { FastifyPluginCallback } from 'fastify';
import type { FastifyJWTOptions } from '@fastify/jwt';
import FastifyJwt from '@fastify/jwt';
import plugin from 'fastify-plugin';

/**
 * **Fastify JWT**
 * @description
 * This plugin is used to generate and verify JWT tokens.
 * It also adds a user property to the request object.
 */
const fastifyJwt: FastifyPluginCallback = async (fastify, opts, done) => {
  if (fastify.jwt)  
    return fastify.log.warn('Fastify/jwt already registered');

  fastify.register(FastifyJwt, {
    secret: process.env.JWT_SECRET,
    cookie: {
      cookieName: 'refresh_token',
      signed: true,
    },
  } as FastifyJWTOptions);

  done();
};

export default plugin(fastifyJwt);
