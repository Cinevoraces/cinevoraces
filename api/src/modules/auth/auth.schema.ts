import type { FastifySchema } from 'fastify';

export const registerSchema: FastifySchema = {
  description: `
  **Registering endpoint.**
  Password must match the following requirments: *8 Characters, at least 1 Number, at least 1 letter.*
  It can contain the following special characters: !#$&%*+=?|
  `,
  tags: ['Authentication'],
  body: {
    type: 'object',
    required: ['mail', 'pseudo', 'password'],
    properties: {
      password: { 
        type: 'string', 
        maxLength: 64,
      },
      mail: { 
        type: 'string', 
        maxLength: 64,
      },
      pseudo: { 
        type: 'string', 
        maxLength: 32, 
      },
    },
  },
  response: {
    '201': {
      type: 'object',
      required: ['message'],
      properties: {
        message: { type: 'string' },
      },
    },
    '409': { $ref: 'apiError#' },
    '422': { $ref: 'apiError#' },
  },
};

export const loginSchema: FastifySchema = {
  description: `
  **Login endpoint**.
  Will respond with an access token in the *body* and a refresh token in a *cookie*.
  `,
  tags: ['Authentication'],
  body: {
    type: 'object',
    required: ['pseudo', 'password'],
    properties: {
      pseudo: { 
        type: 'string', 
        maxLength: 32,
      },
      password: { 
        type: 'string', 
        maxLength: 64,
      },
    },
  },
  response: {
    '200': {
      type: 'object',
      required: ['user', 'token', 'response'],
      properties: {
        user: {
          type: 'object',
          required: ['id', 'pseudo', 'mail', 'role', 'avatar_url'],
          properties: {
            id: { type: 'string' },
            pseudo: { type: 'string' },
            mail: { type: 'string' },
            role: { type: 'string' },
            avatar_url: { type: 'string' },
          },
        },
        token: { type: 'string' },
        response: { type: 'string' },
      },
    },
    '401': { $ref: 'apiError#' },
    '404': { $ref: 'apiError#' },
  },
};

export const refreshSchema: FastifySchema = {
  description: `
  **New token requesting endpoint.**
  The refresh token must be sent in the *authorization headers*.
  A new pair of tokens will be sent in the *body* and in a *cookie*.
  `,
  tags: ['Authentication'],
  headers: {
    type: 'object',
    required: ['Cookie'],
    properties: {
      refresh_token: { type: 'string' },
    },
  },
  response: {
    '200': {
      type: 'object',
      required: ['user', 'token', 'response'],
      properties: {
        user: {
          type: 'object',
          required: ['id', 'pseudo', 'mail', 'role', 'avatar_url'],
          properties: {
            id: { type: 'string' },
            pseudo: { type: 'string' },
            mail: { type: 'string' },
            role: { type: 'string' },
            avatar_url: { type: 'string' },
          },
        },
        token: { type: 'string' },
        response: { type: 'string' },
      },
    },
    '401': { $ref: 'apiError#' },
    '404': { $ref: 'apiError#' },
  },
};
