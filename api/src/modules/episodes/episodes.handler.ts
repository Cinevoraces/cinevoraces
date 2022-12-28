import type { FastifyReply as Reply, FastifyRequest } from 'fastify';
import type { Query } from '../../types/_index';
import { ApiError } from '../../types/_index';
import { getEpisodes } from './episodes.datamapper';

type Request = FastifyRequest<{
  Querystring: Query.querystring;
}>;

/**
 * **Get available episodes**
 * @description Get next 10 available episodes.
*/
export const handleGetAvailableEpisodes = async (request: Request, reply: Reply) => {
  const { error, pgClient } = request;
  const query = { sort: 'desc', limit: 10 } as Query.querystring;
  const { rows: episodes, rowCount } = await pgClient.query(
    getEpisodes(query)
  );

  if (!rowCount)
    error.send(ApiError.NO_EPISODE_AVAILABLE, 404);

  reply
    .code(200)
    .send(episodes);
};

/**
 * **Get episodes**
 * @description Get episodes according to query.
*/
export const handleGetEpisodes = async (request: Request, reply: Reply) => {
  const { error, pgClient, query } = request;
  // TODO: This handler is for admin panel, currently not binded to any endpoint.
  const { rows: episodes, rowCount } = await pgClient.query(
    getEpisodes(query)
  );

  if (!rowCount)
    error.send(ApiError.NO_EPISODE_AVAILABLE, 404);

  reply
    .code(200)
    .send(episodes);
};
