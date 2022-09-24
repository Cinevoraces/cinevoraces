import type { FastifySchema } from "fastify";

export const registerSchema: FastifySchema = {
  body: {
    type: "object",
    properties: {
      user: {
        type: "object",
        required: ["mail", "pseudo", "password"],
        properties: {
          mail: { type: "string" },
          pseudo: { type: "string" },
          password: { type: "string" },
        },
      },
    },
  },
  response: {
    "201": {
      type: "object",
      required: ["message"],
      properties: {
        message: { type: "string" },
      },
    },
    "409": {
      type: "object",
      required: ["message", "statusCode"],
      properties: {
        statusCode: { type: "number" },
        error: { type: "string" },
        message: { type: "string" },
      },
    },
    "422": {
      type: "object",
      required: ["message", "statusCode"],
      properties: {
        statusCode: { type: "number" },
        error: { type: "string" },
        message: { type: "string" },
      },
    },
  },
};

export const loginSchema: FastifySchema = {};
