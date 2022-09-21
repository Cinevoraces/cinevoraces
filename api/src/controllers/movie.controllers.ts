
import Filters from '@src/types/Filters';
import movieFiltersFactory from '@src/utils/movieFiltersFactory';
import { FastifyReply, FastifyRequest } from 'fastify';

type Request = FastifyRequest<{
  Querystring: {
    filter: Filters.Movie
  }
}>

type Reply = FastifyReply


export const getMovies = async (request: Request, reply: Reply) => {
  const { prisma } = request;

  try {
    const filters = movieFiltersFactory(request.query.filter)
    
    const movies = await prisma.movie.findMany({
      where: {
        AND: [
          ...filters
        ]
      }

    });
    reply.send(movies);
    
  } catch (error) {
    reply.send(error);
  }
}