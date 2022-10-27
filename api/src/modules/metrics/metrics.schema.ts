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

export const getUsersMetricsSchema: FastifySchema = {
  description: `
  **Get All users metrics**
  Use query parameters to filter the results using the following format: */reviews?filter[user_id]=2.
  **Available query parameters:**
  - filter[user_id]: filter by user id.
  `,
  tags: ['Metrics'],
  querystring: {
    type: 'object',
    properties: {
      filter: {
        type: 'object',
        properties: {
          user_id: { type: 'number' },
        },
      },
    },
  },
  response: {
    '200': {
      type: 'array',
      items: { $ref: 'userMetrics#' },
    },
    '404': { $ref: 'apiError#' },
  },
};
