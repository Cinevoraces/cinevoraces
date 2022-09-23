import { FastifyInstance } from "fastify";
import { getMovieById, getMovies } from "./movies.handler";
import { getMovieSchema, getMoviesSchema } from "./movies.schema";

export const movies = async (fastify: FastifyInstance) => {
  
  fastify.route({
    method: "GET",
    url: '/movies',
    schema: getMoviesSchema,
    handler: getMovies
  })

  fastify.route({
    method: "GET",
    url: '/movies/:id',
    schema: getMovieSchema,
    handler: getMovieById
  })
  
}