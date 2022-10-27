import type { FastifyInstance } from 'fastify';
import {
  handleGetGlobalMetrics,
  handleGetUsersMetrics,
} from '@modules/metrics/metrics.handler';
import { getGlobalMetricsSchema, getUsersMetricsSchema } from '@modules/metrics/metrics.schema';

export const metrics = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'GET',
    url: '/metrics',
    schema: getGlobalMetricsSchema,
    handler: handleGetGlobalMetrics,
  });

  fastify.route({
    method: 'GET',
    url: '/metrics/users',
    schema: getUsersMetricsSchema,
    handler: handleGetUsersMetrics,
  });
};
