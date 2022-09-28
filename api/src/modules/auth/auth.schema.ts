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
    "500": {
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

export const loginSchema: FastifySchema = {
  body: {
    type: "object",
    properties: {
      user: {
        type: "object",
        required: ["pseudo", "password"],
        properties: {
          pseudo: { type: "string" },
          password: { type: "string" },
        },
      },
    },
  },
  response: {
    "200": {
      type: "object",
      required: ["user", "response"],
      properties: {
        user: {
          type: "object",
          required: ["id", "pseudo", "mail", "role", "avatar_url"],
          properties: {
            id: { type: "string" },
            pseudo: { type: "string" },
            mail: { type: "string" },
            role: { type: "string" },
            avatar_url: { type: "string" },
          },
        },
        message: { type: "string" },
      },
    },
    "401": {
      type: "object",
      required: ["message", "statusCode"],
      properties: {
        statusCode: { type: "number" },
        error: { type: "string" },
        message: { type: "string" },
      },
    },
    "404": {
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
