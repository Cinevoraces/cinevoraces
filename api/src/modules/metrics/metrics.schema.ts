import type { FastifySchema } from 'fastify';

export const getGlobalMetricsSchema: FastifySchema = {
  description: `
  **Get website metrics**
  `,
  tags: ['Metrics'],
  response: {
    200: { $ref: 'globalMetrics#' },
  },
};
