import type { FastifySchema } from 'fastify';

export const getUsersSchema: FastifySchema = {
  description: `
  **Get all users**.
  Use query parameters to populate the results using the following format: */users?pop[movies]=true&pop[reviews]=true*  
  **Available query parameters:**
  - filter[pseudo]: filter by user pseudo
  - filter[mail]: filter by user mail
  - filter[role]: filter by user role
  - pop[movies]: populate with user posted movies
  - pop[reviews]: populate with user posted reviews
  `,
  tags: ['Users'],
  querystring: {
    type: 'object',
    properties: {
      filter: {
        type: 'object',
        properties: {
          pseudo: { type: 'string' },
          mail: { type: 'string' },
          role: { type: 'string' },
        },
      },
      pop: {
        type: 'object',
        properties: {
          movies: { type: 'boolean' },
          reviews: { type: 'boolean' },
        },
      },
    },
  },
  response: {
    '200': {
      type: 'array',
      items: { $ref: 'user#' },
    },
  },
};

export const getUserByIdSchema: FastifySchema = {
  description: `
  **Get one user by id**.
  Use query parameters to populate the results using the following format: */users?pop[movies]=true&pop[reviews]=true&pop[metrics]=true*
  Available query parameters:
  - pop[movies]: populate with user posted movies
  - pop[reviews]: populate with user posted reviews
  - pop[metrics]: populate with user metrics
  `,
  tags: ['Users'],
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
  },
  querystring: {
    type: 'object',
    properties: {
      pop: {
        type: 'object',
        properties: {
          movies: { type: 'boolean' },
          reviews: { type: 'boolean' },
          metrics: { type: 'boolean' },
        },
      },
    },
  },
  response: {
    '200': {
      $ref: 'user#',
    },
    '404': { $ref: 'apiError#' },
  },
};

export const putUserByIdSchema: FastifySchema = {
  description: `
  **Modify user by token**.
  Modify property in *update_user* object sent in the body.
  *update_user* **can** contain one or more of the following properties: *pseudo*, *mail* or *password*.
  Password must match the following requirments: *8 Characters, at least 1 Number, at least 1 letter.*
  It can contain the following special characters: !#$&%*+=?|
  You must provide the current password as well.
  `,
  tags: ['Users'],
  body: {
    type: 'object',
    required: ['password'],
    properties: {
      password: { type: 'string' },
      update_user: {
        type: 'object',
        properties: {
          pseudo: { type: 'string' },
          mail: { type: 'string' },
          password: { type: 'string' },
        },
      },
    },
  },
  response: {
    '200': {
      required: ['message'],
      properties: {
        message: { type: 'string' },
      },
    },
    '401': { $ref: 'apiError#' },
    '422': { $ref: 'apiError#' },
  },
};

export const deleteUserByIdSchema: FastifySchema = {
  summary: 'Admin only',
  description: `
  **Delete user by id**.
  Route protected by *admin* role.
  You must provide the password as well.
  `,
  tags: ['Users'],
  body: {
    type: 'object',
    required: ['password'],
    properties: {
      password: { type: 'string' },
    },
  },
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
  },
  response: {
    '200': {
      type: 'object',
      required: ['message'],
      properties: {
        message: { type: 'string' },
      },
    },
    '401': { $ref: 'apiError#' },
    '403': { $ref: 'apiError#' },
    '404': { $ref: 'apiError#' },
  },
};
