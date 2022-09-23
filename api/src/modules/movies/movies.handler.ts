import Filters from '@src/types/Filters';
import movieFiltersFactory from '@src/utils/movieFiltersFactory';
import { FastifyReply, FastifyRequest } from 'fastify';

type Request = FastifyRequest<{
  Querystring: {
    filter: Filters.Movie
  }
  Params: {
    id: number
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

export const getMovieById = async (request: Request, reply: Reply) => {
  const { prisma } = request
  try {
    const {id} = request.params
    
    const movie = await prisma.movie.findUnique({
      where: {
        id
      }

    });
    reply.send(movie);
    
  } catch (error) {
    reply.send(error);
  }
}