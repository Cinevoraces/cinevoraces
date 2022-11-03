import type { FastifyPluginCallback } from 'fastify';
import plugin from 'fastify-plugin';

import { verifyTokensHooks } from '@hooks/verifyTokens';
import { verifyRolesHooks } from '@hooks/verifyRoles';
import { verifyMoviesHooks } from '@hooks/verifyMovies';
import { verifyPasswordHooks } from '@hooks/verifyPassword';
import { findOrCreateReviewHooks } from '@hooks/findOrCreateReview';

const hooks: FastifyPluginCallback = async (fastify, opts, done) => {
  fastify.register(verifyTokensHooks);
  fastify.register(verifyRolesHooks);
  fastify.register(verifyMoviesHooks);
  fastify.register(verifyPasswordHooks);
  fastify.register(findOrCreateReviewHooks);
  done();
};

export default plugin(hooks);
