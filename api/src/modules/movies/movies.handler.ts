import type { FastifyReply as Reply, FastifyRequest } from "fastify";
import Filters from "@src/types/Filters";
import movieFiltersFactory from "@src/utils/movieFiltersFactory";
import { Prisma } from "@prisma/client";

type Request = FastifyRequest<{
  Querystring: {
    filter: Filters.Movie;
  };
  Params: {
    id: number;
  };
}>;

export const handleGetMovies = async (request: Request, reply: Reply) => {
  const { prisma } = request;
  const filters = movieFiltersFactory(request.query.filter)

  try {
    const movies = await prisma.movie.findMany(
      (filters && filters.where) && {
        where: { AND: [...filters.where].reduce<Prisma.movieWhereInput[]>(
          (acc, v) => (v !== undefined ? [...acc, v] : acc),
          [],
        ), },
      }
    );
    reply.send(movies);
  } catch (error) {
    reply.send(error);
  }
};

export const handleGetMovieById = async (request: Request, reply: Reply) => {
  const { prisma } = request;
  const { id } = request.params;

  try {
    const movie = await prisma.movie.findUnique({
      where: {
        id,
      },
    });
    reply.send(movie);
  } catch (error) {
    reply.send(error);
  }
};
