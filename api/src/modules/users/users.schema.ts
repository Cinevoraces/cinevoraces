import type { FastifySchema } from 'fastify';

export const getUsersSchema: FastifySchema = {
  description: `
  **Get users**.
  Use query parameters to populate the results using the following format: */users?pop[movies]=true&pop[reviews]=true*  
  **Available query parameters:**
  - where[id]: filter by user id
  - where[pseudo]: filter by user pseudo
  - where[mail]: filter by user mail
  - where[role]: filter by user role
  - select[propositions]: populate with user posted movies
  - select[reviews]: populate with user posted reviews
  - select[metrics]: populate with user metrics
  `,
  tags: ['Users'],
  querystring: {
    type: 'object',
    properties: {
      where: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          pseudo: { type: 'string' },
          mail: { type: 'string' },
          role: { type: 'string' },
        },
      },
      select: {
        type: 'object',
        properties: {
          propositions: { type: 'boolean' },
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
