import type { FastifyPluginCallback } from 'fastify';
import type { FastifyJWTOptions } from '@fastify/jwt';
import type { review } from '@prisma/client';
import fastifyJwt from '@fastify/jwt';
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
      previous_review?: Partial<review>;
    }
  }
}

const jwt: FastifyPluginCallback = async (fastify, opts, done) => {
  if (fastify.jwt) {
    return fastify.log.warn('Fastify/jwt already registered');
  }

  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET,
    cookie: {
      cookieName: 'refresh_token',
      signed: true,
    }
  } as FastifyJWTOptions);

  done();
};

export default plugin(jwt);
