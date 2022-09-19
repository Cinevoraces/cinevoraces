import type { FastifyReply, FastifyRequest } from 'fastify';

export const getMovies = async (request: FastifyRequest, reply: FastifyReply) => {
  const { prisma } = request;

  try {
    const movies = await prisma.movie.findMany();
    reply.send(movies);
    
  } catch (error) {
    reply.send(error);
  }
}