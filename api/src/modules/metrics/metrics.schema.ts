import type { FastifySchema } from 'fastify';

export const getGlobalMetricsSchema: FastifySchema = {
  description: `
  **Get website metrics**
  `,
  tags: ['Metrics'],
  response: {
    '200': { $ref: 'globalMetrics#' },
    '404': { $ref: 'apiError#' },
  },
};

export const getGetAllUsersMetrics: FastifySchema = {
  description: `
  **Get All users metrics**
  `,
  tags: ['Metrics'],
  response: {
    '200': {
      type: 'array',
      items: { $ref: 'userMetrics#' },
    },
    '404': { $ref: 'apiError#' },
  },
};

export const getUsersMetricsById: FastifySchema = {
  description: `
  **Get one user metrics by id**
  `,
  tags: ['Metrics'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
  },
  response: {
    '200': { $ref: 'userMetrics#' },
    '404': { $ref: 'apiError#' },
  },
};
