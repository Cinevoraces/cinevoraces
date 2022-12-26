import type { FastifyReply as Reply, FastifyRequest } from 'fastify';
import type { Query } from '../../types/_index';
import { ApiError, ApiResponse } from '../../types/_index';
import { getEpisodes, updateEpisode } from './episodes.datamapper';

type Request = FastifyRequest<{
  Querystring: Query.querystring;
  Params: { id: number };
}>;

/**
 * **Get episodes**
 * @description Get episodes according to query.
*/
export const handleGetEpisodes = async (request: Request, reply: Reply) => {
  const { error, pgClient, query } = request;

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
 * **Book episode**
 * @description Book a episode as user
*/
export const handleBookEpisode = async (request: Request, reply: Reply) => {
  const { pgClient, params } = request;
  const { id: episodeId } = params;

  await pgClient.query(
    updateEpisode(episodeId, true)
  );

  reply
    .code(204)
    .send({ message: ApiResponse.EPISODE_BOOKING_SUCCESS });
};

/**
 * **Unbook episode (ADMIN)**
 * @description Unbook an episode as Admin
*/
export const handleAdminUnbookEpisode = async (request: Request, reply: Reply) => {
  const { pgClient, params } = request;
  const { id: episodeId } = params;

  await pgClient.query(
    updateEpisode(episodeId, false)
  );

  reply
    .code(204)
    .send({ message: ApiResponse.EPISODE_RELEASE_SUCCESS });
};
