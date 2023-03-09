import { ESchemasIds } from '../enums/_index';

export const GETPublicUsers = {
  $id: ESchemasIds.GETPublicUsers,
  description: `
  **Get public users**.
  Use query parameters to populate the results using the following format: */users?select[reviews]=true&where[id]=1*  
  **Available filters:**
  - where[id] -> number
  - where[pseudo] -> string
  - where[mail] -> string
  - where[role] -> string

  **Available populators**
  - select[propositions] -> boolean
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
          propositions: { type: 'boolean' },
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
      items: { $ref: `${ESchemasIds.IPublicUser}#` },
    },
  },
};

export const GETPrivateUsers = {
  $id: ESchemasIds.GETPrivateUsers,
  summary: '(TOKEN REQUIRED)',
  description: `
  **Get users**.
  Use query parameters to populate the results using the following format: */users?select[reviews]=true&where[id]=1*  
  **Available filters:**
  - where[id] -> number
  - where[pseudo] -> string
  - where[mail] -> string
  - where[role] -> string

  **Available populators**
  - select[propositions] -> boolean
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
          propositions: { type: 'boolean' },
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
      items: { $ref: `${ESchemasIds.IPrivateUser}#` },
    },
  },
};

export const PUTUsers = {
  $id: ESchemasIds.PUTUsers,
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
    201: {
      properties: {
        message: { type: 'string' },
      },
      required: ['message'],
    },
  },
};

export const PUTUsersAvatar = {
  $id: ESchemasIds.PUTUsersAvatar,
  summary: '(TOKEN REQUIRED)',
  description: `
  **Modify user avatar by token**.
  Send a multipart/form-data request with the following fields:
  - avatar: file
  `,
  tags: ['Users'],
  response: {
    201: {
      properties: {
        message: { type: 'string' },
      },
      required: ['message'],
    },
  },
};

