import type { FastifyInstance } from 'fastify';
import envCheck from '@plugins/envCheck';
import pgClient from '@plugins/pgClient';
import jwt from '@src/plugins/fastifyJwt';
import hooks from '@plugins/hooks';
import swagger from '@plugins/swagger';
import cookie from '@src/plugins/fastifyCookie';
import { auth } from '@modules/auth/auth.routes';
// import { metrics } from '@modules/metrics/metrics.routes';
// import { movies } from '@modules/movies/movies.routes';
// import { propositions } from '@modules/propositions/propositions.routes';
// import { reviews } from '@modules/reviews/reviews.routes';
// import { users } from '@modules/users/users.routes';
import schemasRegister from './schemas';

const app = async (fastify: FastifyInstance) => {
  // Register Schemas
  fastify.register(schemasRegister);

  // Register plugins
  fastify.register(envCheck);
  fastify.register(pgClient);
  fastify.register(cookie);
  fastify.register(jwt);
  fastify.register(hooks);
  fastify.register(swagger);

  // Register routes
  fastify.register(auth);
  // fastify.register(metrics);
  // fastify.register(movies);
  // fastify.register(propositions);
  // fastify.register(reviews);
  // fastify.register(users);
};

export default app;
