import type { FastifySchema } from "fastify";

export const getMoviesSchema: FastifySchema = {
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
      items: { $ref: "movie#" },
    },
  },
};

export const getMovieSchema: FastifySchema = {
  params: {
    type: "object",
    properties: {
      id: { type: "number" },
    },
  },
  response: {
    200: {
      $ref: "movie#",
    },
  },
};
