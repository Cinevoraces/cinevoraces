import type { FastifyInstance } from 'fastify';
import { handleGetGlobalMetrics } from '@modules/metrics/metrics.handler';
import { getGlobalMetricsSchema } from '@modules/metrics/metrics.schema';

export const metrics = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'GET',
    url: '/metrics',
    schema: getGlobalMetricsSchema,
    handler: handleGetGlobalMetrics,
  });
};
