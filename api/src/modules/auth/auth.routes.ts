import type { FastifyInstance } from 'fastify';
import {
  handleLogin,
  handleRegister,
  handleRefreshToken,
} from './auth.handler';
import { 
  loginSchema, 
  registerSchema, 
  refreshSchema 
} from './auth.schema';

export const auth = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'POST',
    url: '/register',
    schema: registerSchema,
    handler: handleRegister,
  });

  fastify.route({
    method: 'POST',
    url: '/login',
    schema: loginSchema,
    handler: handleLogin,
  });

  fastify.route({
    method: 'GET',
    url: '/refresh',
    schema: refreshSchema,
    handler: handleRefreshToken,
    onRequest: [fastify.verifyRefreshToken],
  });
};
