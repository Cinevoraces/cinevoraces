import type { FastifySchema } from 'fastify';

export const getUsersSchema: FastifySchema = {
  description: `
  **Get users**.
  Use query parameters to populate the results using the following format: */users?select[reviews]=true&where[id]=1*  
  **Available filters:**
  - where[id] -> number
  - where[pseudo] -> string
  - where[mail] -> string
  - where[role] -> string

  **Available populators**
  - select[proposition] -> boolean
  - select[movies] -> boolean
  - select[reviews] -> boolean
  - select[metrics] -> boolean

  **Misc:**
  - limit -> number: *limit the number of results*.
  - sort -> 'asc' | 'desc' as string *(Will sort by id)*
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
          proposition: { type: 'boolean' },
          movies: { type: 'boolean' },
          reviews: { type: 'boolean' },
          metrics: { type: 'boolean' },
        },
      },
      limit: { type: 'number' },
      sort: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'array',
      items: { $ref: 'user#' },
    },
  },
};

export const putUserSchema: FastifySchema = {
  summary: '(TOKEN REQUIRED)',
  description: `
  **Modify user by token**.
  Modify property in *update_user* object sent in the body.
  *update_user* **can** contain one or more of the following properties: *pseudo*, *mail* or *password*.
  Password must match the following requirments: *8 Characters, at least 1 Number, at least 1 letter. Max 64 characters*
  It can contain the following special characters: !#$&%*+=?|
  You must provide the current password as well.
  `,
  tags: ['Users'],
  body: {
    type: 'object',
    required: ['password', 'update_user'],
    properties: {
      password: { type: 'string' },
      update_user: {
        type: 'object',
        properties: {
          pseudo: { 
            type: 'string',
            maxLength: 32,
          },
          mail: { 
            type: 'string', 
            maxLength: 64,
          },
          password: { 
            type: 'string', 
            maxLength: 64, 
          },
        },
      },
    },
  },
  response: {
    204: {
      properties: {
        message: { type: 'string' },
      },
      required: ['message'],
    },
  },
};

export const putUserAvatarSchema: FastifySchema = {
  summary: '(TOKEN REQUIRED)',
  description: `
  **Modify user avatar by token**.
  Send a multipart/form-data request with the following fields:
  - avatar: file
  `,
  tags: ['Users'],
  response: {
    204: {
      properties: {
        message: { type: 'string' },
      },
      required: ['message'],
    },
  },
};

export const adminDeleteUserByIdSchema: FastifySchema = {
  description: `
  **Delete user by id**.
  Route protected by *admin* role.
  You must provide the password as well.
  `,
  tags: ['Admin'],
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
    required: ['id'],
  },
  response: {
    204: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
      required: ['message'],
    },
  },
};
