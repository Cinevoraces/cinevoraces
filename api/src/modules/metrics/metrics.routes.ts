import type { FastifyInstance } from 'fastify';
import { handleGetGlobalMetrics } from './metrics.handler';
import { getGlobalMetricsSchema } from './metrics.schema';

export const metrics = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'GET',
    url: '/metrics',
    schema: getGlobalMetricsSchema,
    handler: handleGetGlobalMetrics,
  });
};
