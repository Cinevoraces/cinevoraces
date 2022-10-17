import type { FastifyReply as Reply, FastifyRequest } from 'fastify';
import type Filters from '@src/types/Filters';
import filtersFactoryMovie from '@src/utils/filtersFactoryMovie';

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
  const filters = filtersFactoryMovie(request.query.filter);

  try {
    const movies = await prisma.movie.findMany(
      filters && {
        where: { AND: [...filters]},
      }
    );
    
    if (movies.length === 0) {
      reply.code(404);
      throw new Error('Aucun film trouvé');
    }

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
