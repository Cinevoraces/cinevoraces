import type { FastifyPluginCallback } from 'fastify';
import type { FastifyJWTOptions } from '@fastify/jwt';
import type { Database } from '@src/types/Database';
import FastifyJwt from '@fastify/jwt';
import plugin from 'fastify-plugin';

declare module '@fastify/jwt' {
  interface VerifyOptions {
    onlyCookie: boolean;
  }
  interface FastifyJWT {
    user: {
      id?: number;
      pseudo?: string;
      mail?: string;
      role?: string;
      avatar_url?: string;
      previous_review?: Partial<Database.review>;
    }
  }
}

/**
 * **Fastify JWT**
 * @description
 * This plugin is used to generate and verify JWT tokens.
 * It also adds a user property to the request object.
 */
const fastifyJwt: FastifyPluginCallback = async (fastify, opts, done) => {
  if (fastify.jwt) {
    return fastify.log.warn('Fastify/jwt already registered');
  }

  fastify.register(FastifyJwt, {
    secret: process.env.JWT_SECRET,
    cookie: {
      cookieName: 'refresh_token',
      signed: true,
    }
  } as FastifyJWTOptions);

  done();
};

export default plugin(fastifyJwt);
