import type { FastifyReply as Reply, FastifyRequest } from 'fastify';
import type { Query } from '../../types/_index';
import { ApiError } from '../../types/_index';
import { getAvailableEpisodes } from './episodes.datamapper';

type Request = FastifyRequest<{
  Querystring: Query.querystring;
}>;

/**
 * **Get available episodes**
 * @description Get next 5 available episodes within 1 month.
*/
export const handleGetAvailableEpisodes = async (request: Request, reply: Reply) => {
  const { error, pgClient } = request;
  const { rows: episodes, rowCount } = await pgClient.query(
    getAvailableEpisodes()
  );

  if (!rowCount)
    error.send(ApiError.NO_EPISODE_AVAILABLE, 404);

  reply
    .code(200)
    .send(episodes);
};
