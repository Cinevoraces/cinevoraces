import type { FastifyReply, FastifyRequest } from 'fastify';
import fastifyJwt from '@fastify/jwt'
import plugin from 'fastify-plugin';

const jwt = async (fastify: fastifyInstance) => {
  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET
  })
  
  fastify
    .decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  });
};

export default plugin(jwt);