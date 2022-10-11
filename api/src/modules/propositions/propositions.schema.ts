import type { FastifySchema } from "fastify";

export const getAllSlotsSchema: FastifySchema = {
  description: `**Get all slots**.
  Use query parameters to filter the results using the following format: */slots?filter[is_booked]=true*
  Available query parameters:
  - filter[is_booked]: filter by booked status.
  `,
  tags: ['Propositions'],
  querystring: {
    type: "object",
    properties: {
      filter: {
        type: "object",
      },
    },
  },
  response: {
    "200": {
      type: "array",
      items: { $ref: "slot#" },
    },
    "404": { $ref: "apiError#" },
  },
};

export const bookSlotSchema: FastifySchema = {
  description: `**Book a slot by token**.
  Slot's *id* must be set in *params* and access token in bearer to pass user id.`,
  tags: ['Propositions'],
  params: {
    type: "object",
    properties: {
      id: { type: "number" },
    },
  },
  response: {
    "200": { 
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
    "401": { $ref: "apiError#" },
    "404": { $ref: "apiError#" },
    "406": { $ref: "apiError#" },
  },
};

export const unbookSlotSchema: FastifySchema = {
  summary: "Admin only",
  description: `**Unbook a slot by id**.
  Route protected by *admin* role.
  You must provide the password as well.
  `,
  tags: ['Propositions'],
  params: {
    type: "object",
    properties: {
      id: { type: "number" },
    },
  },
  body: {
    type: "object",
    required: ["password"],
    properties: {
      password: { type: "string" },
    },
  },
  response: {
    "200": { 
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
    "401": { $ref: "apiError#" },
  },
};

export const getAllUsersPropositionSchema: FastifySchema = {
  description: `**Get all users proposition**.`,
  tags: ['Propositions'],
  response: {
    "200": { 
      type: "array",
      items: { $ref: "proposition#" },
    },
    "404": { $ref: "apiError#" },
  },
};

export const getUsersPropositionByIdSchema: FastifySchema = {
  description: `**Get user proposition by id**.`,
  tags: ['Propositions'],
  params: {
    type: "object",
    properties: {
      id: { type: "number" },
    },
  },
  response: {
    "200": { $ref: "proposition#" },
    "404": { $ref: "apiError#" },
  },
};