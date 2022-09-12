import { getMovie } from "@src/controllers/movie.controllers";

export default async function movie(fastify: serverInstance) {

  const movieGetOpts = {
    schema: {},
    handler: getMovie
  }

  fastify.get('/', movieGetOpts);
}