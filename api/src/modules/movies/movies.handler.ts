import type { FastifyReply as Reply, FastifyRequest } from "fastify";
import Filters from "@src/types/Filters";
import movieFiltersFactory from "@src/utils/movieFiltersFactory";

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
  const filters = request.query.filter
    ? movieFiltersFactory(request.query.filter)
    : null;

  try {
    const movies = await prisma.movie.findMany(
      filters && {
        where: { AND: [...filters] },
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
