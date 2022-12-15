import type { FastifyPluginCallback } from 'fastify';
import { globalMetricsSchema, userMetricsSchema } from './metrics';
import apiErrorSchema from './apiError';
import movieSchema from './movie';
import userSchema from './user';
import reviewSchema from './review';
import slotSchema from './slot';
import seasonSchema from './season';

import plugin from 'fastify-plugin';

const schemasRegister: FastifyPluginCallback = async (fastify, opts, done) => {
  const schemas = [
    apiErrorSchema,
    movieSchema,
    userSchema,
    reviewSchema,
    slotSchema,
    seasonSchema,
    globalMetricsSchema,
    userMetricsSchema,
  ];

  schemas.forEach((schema) => {
    fastify.addSchema(schema);
  });
  done();
};

export default plugin(schemasRegister);
