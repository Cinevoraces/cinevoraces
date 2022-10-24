import type { FastifyReply as Reply, FastifyRequest } from 'fastify';
import type { rawMovie } from '@src/types/Movies';
import type PrismaQuery from '@src/types/Query';
import prismaQueryFactory from '@src/utils/prismaQueryFactory';
import transformResponse from '@src/utils/transformResponse';

type Request = FastifyRequest<{
  Querystring: PrismaQuery.Querystring;
  Params: { id: number };
}>;

export const handleGetMovies = async (request: Request, reply: Reply) => {
  const { prisma, query, user } = request;
  const prismaQuery = prismaQueryFactory(query, 'Movie', user?.id);

  try {
    const movies = await prisma.movie.findMany(prismaQuery);

    if (movies.length === 0) {
      reply.code(404);
      throw new Error('Aucun film trouvé');
    }

    reply.send(transformResponse.manyMovies(movies as rawMovie[]));
  } catch (error) {
    reply.send(error);
  }
};

export const handleGetMovieById = async (request: Request, reply: Reply) => {
  const { prisma, params } = request;
  const { id } = params;

  try {
    const movie = await prisma.movie.findUnique({ where: { id } });

    reply.send(movie);
  } catch (error) {
    reply.send(error);
  }
};
