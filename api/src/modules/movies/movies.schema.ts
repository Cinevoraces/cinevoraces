import { FastifySchema } from "fastify"


const getMoviesSchema: FastifySchema = {
  querystring: {
    type: "object",
    properties: {
      filter: {
        type: 'object'
      }
    }
  },
  response: {
    "200": {
      type: "array",
      items: {$ref: "movie#"}
    }
  }
}

const getMovieSchema: FastifySchema = {
  params: {
    type: "object",
    properties: {
      id: { type: 'number'}
    }
  },
  response: {
    200: {
      $ref: "movie#"
    }
  }
}

export {getMoviesSchema, getMovieSchema}


