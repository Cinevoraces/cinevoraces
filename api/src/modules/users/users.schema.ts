import type { FastifySchema } from "fastify";

export const getUsersSchema: FastifySchema = {
  querystring: {
    type: "object",
    properties: {
      pop: {
        type: "object",
      },
    },
  },
  response: {
    "200": {
      type: "array",
      items: { $ref: "user#" },
    },
  },
};

export const getUserByIdSchema: FastifySchema = {
  params: {
    type: "object",
    properties: {
      id: { type: "number" },
    },
  },
  querystring: {
    type: "object",
    properties: {
      pop: {
        type: "object",
      },
    },
  },
  response: {
    "200": {
      $ref: "user#",
    },
  },
};

export const putUserByIdSchema: FastifySchema = {
  body: {
    type: "object",
    required: ["password"],
    properties: {
      password: { type: "string" },
      update_user: {
        type: "object",
        properties: {
          pseudo: { type: "string" },
          mail: { type: "string" },
          password: { type: "string" },
        },
      },
    },
  },
  response: {
    "200": {
      required: ["message"],
      properties: {
        message: { type: "string" },
      },
    },
  },
};

export const deleteUserById: FastifySchema = {
  body: {
    type: "object",
    required: ["password"],
    properties: {
      password: { type: "string" },
      delete_user: {
        type: "object",
        properties: {

        },
      },
    },
  },
  response: {
    "200": {
      type: "object",
      required: ["message"],
      properties: {
        message: { type: "string" },
      },
    },
  },
};
