import type { FastifyReply as Reply, FastifyRequest } from 'fastify';
import type { Query } from '@src/types/Query';
import { getAllSeasons } from '@modules/seasons/seasons.datamapper';

type Request = FastifyRequest<{
  Querystring: Query.querystring;
}>;

/**
 * **Get global metrics**
 * @description Get all seasons objects.
 */
export const handleGetAllSeasons = async (request: Request, reply: Reply) => {
  const { pgClient } = request;

  try {
    const { rows: seasons } = await pgClient.query(getAllSeasons());

    reply
      .code(200) // OK
      .send(seasons);
  } catch (error) {
    reply.send(error);
  }
};
