import type { FastifySchema } from 'fastify';

export const getSlotsSchema: FastifySchema = {
  summary: '(TOKEN REQUIRED)',
  description: `**Get slots**.
  Use query parameters to filter the results using the following format: */slots?where[is_booked]=true*  
  **Available filters:**
  - where[id] -> number
  - where[is_booked] -> boolean
  - where[season_number] -> number
  - where[episode] -> number

  **Misc:**
  - limit -> number: *limit the number of results*.
  - sort -> 'asc' | 'desc' as string *(Will sort by id)*
  `,
  tags: ['Slots'],
  querystring: {
    type: 'object',
    properties: {
      where: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          is_booked: { type: 'boolean' },
          season_number: { type: 'number' },
          episode: { type: 'number' },
        },
      },
      limit: { type: 'number' },
      sort: { type: 'string' },
    },
  },
  response: {
    '200': {
      type: 'array',
      items: { $ref: 'slot#' },
    },
    '404': { $ref: 'apiError#' },
  },
};

export const bookSlotSchema: FastifySchema = {
  summary: '(TOKEN REQUIRED)',
  description: `**Book a slot by token**.
  Slot's *id* must be set in *params* and access token in bearer to pass user id.`,
  tags: ['Slots'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
  },
  response: {
    '204': { 
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    '401': { $ref: 'apiError#' },
    '404': { $ref: 'apiError#' },
    '406': { $ref: 'apiError#' },
  },
};

export const adminUnbookSlotSchema: FastifySchema = {
  description: `**Unbook a slot by id**.
  Route protected by *admin* role.
  You must provide the password as well.
  `,
  tags: ['Admin'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
  },
  body: {
    type: 'object',
    required: ['password'],
    properties: {
      password: { type: 'string' },
    },
  },
  response: {
    '204': { 
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    '401': { $ref: 'apiError#' },
    '403': { $ref: 'apiError#' },
    '404': { $ref: 'apiError#' },
  },
};
