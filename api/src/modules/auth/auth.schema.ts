import type { FastifySchema } from "fastify";

export const registerSchema: FastifySchema = {
  body: {
    type: "object",
    required: ["mail", "pseudo", "password"],
    properties: {
      password: { type: "string" },
      mail: { type: "string" },
      pseudo: { type: "string" },
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
    "409": { $ref: "apiError#" },
    "422": { $ref: "apiError#" },
  },
};

export const loginSchema: FastifySchema = {
  body: {
    type: "object",
    required: ["pseudo", "password"],
    properties: {
      pseudo: { type: "string" },
      password: { type: "string" },
    },
  },
  response: {
    "200": {
      type: "object",
      required: ["user", "token", "response"],
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
        token: { type: "string" },
        response: { type: "string" },
      },
    },
    "401": { $ref: "apiError#" },
    "404": { $ref: "apiError#" },
  },
};

export const refreshSchema: FastifySchema = {
  headers: {
    type: "object",
    required: ["Cookie"],
    properties: {
      refresh_token: { type: "string" },
    },
  },
  response: {
    "200": {
      type: "object",
      required: ["user", "token", "response"],
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
        token: { type: "string" },
        response: { type: "string" },
      },
    },
  },
};