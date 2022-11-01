import type { FastifyReply as Reply, FastifyRequest } from 'fastify';
import type { Query } from '@src/types/Query';
import { getMovies } from '@modules/movies/movies.dataMapper';

type Request = FastifyRequest<{
  Querystring: Query.querystring;
}>;

/**
 * **Get movies**
 * @description Get movies according to query.
*/
export const handleGetMovies = async (request: Request, reply: Reply) => {
  const { pgClient, query } = request;

  try {
    const { rows: movies, rowCount } = await pgClient.query(
      getMovies(query)
    );
    if (!rowCount) {
      reply.code(404);
      throw new Error('Aucun film trouvé');
    }

    reply.send(movies);
  } catch (error) {
    reply.send(error);
  }
};
