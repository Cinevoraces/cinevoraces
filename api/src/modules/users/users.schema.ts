import type { FastifySchema } from "fastify";

export const getUsersSchema: FastifySchema = {
  querystring: {
    type: "object",
    properties: {
      // filter: {
      //   type: "object",
      // },
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
  response: {
    "200": {
      $ref: "user#",
    },
  },
};

export const putUserByIdSchema: FastifySchema = {
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
      pseudo: { type: "string" },
      mail: { type: "string" },
      updated_password: { type: "string" },
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
