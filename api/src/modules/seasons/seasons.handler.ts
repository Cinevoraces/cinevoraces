import type { FastifyReply as Reply, FastifyRequest } from 'fastify';
import type { Query } from '@src/types/Query';
import type { Payload } from '@src/types/Payload';
import {
  getAllSeasons,
  createNewSeason,
  getOneSeasonBySeasonNumber,
} from '@modules/seasons/seasons.datamapper';

type Request = FastifyRequest<{
  Querystring: Query.querystring;
}>;

/**
 * **Get seasons**
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

/**
 * **Create new season**
 * @description Create new season and all associated episodes.
 */
export const handleCreateNewSeason = async (
  request: FastifyRequest<{ Body: Payload.createSeason }>,
  reply: Reply
) => {
  const { pgClient, body } = request;

  try {
    await pgClient.query(createNewSeason(body));
    const { rowCount } = await pgClient.query(
      getOneSeasonBySeasonNumber(body.season_number)
    );

    if (!rowCount) {
      reply.code(500);
      throw new Error('Erreur, aucune saison créée.');
    }

    reply
      .code(201) // Created
      .send({ message: `Saison numéro ${body.season_number} créée.` });
  } catch (error) {
    reply.send(error);
  }
};
