import type { FastifyReply as Reply, FastifyRequest } from 'fastify';
import type { Query } from '../../types/_index';
import { ApiError, ApiResponse } from '../../types/_index';
import {
  getAllSeasons,
  createNewSeason,
  getOneSeasonBySeasonNumber,
} from './seasons.datamapper';

type Request = FastifyRequest<{
  Querystring: Query.querystring;
}>;

/**
 * **Get seasons**
 * @description Get all seasons objects.
 */
export const handleGetAllSeasons = async (request: Request, reply: Reply) => {
  const { pgClient } = request;

  const { rows: seasons } = await pgClient.query(getAllSeasons());

  reply
    .code(200) // OK
    .send(seasons);
};

/**
 * **Create new season**
 * @description Create new season and all associated episodes.
 */
export const handleCreateNewSeason = async (
  request: FastifyRequest<{
    Body: {
      year: number;
      season_number: number;
    } }>,
  reply: Reply
) => {
  const { error, pgClient, body } = request;

  await pgClient.query(createNewSeason(body));
  const { rowCount } = await pgClient.query(
    getOneSeasonBySeasonNumber(body.season_number)
  );

  if (!rowCount) 
    error.send(ApiError.ERROR_CREATE_SEASON, 500);

  reply
    .code(201) // Created
    .send({ message: ApiResponse.SEASON_CREATED_SUCCESS });
};
