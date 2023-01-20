import type {
  FastifyInstance,
  FastifyRequest as Request,
  FastifyReply as Reply,
} from 'fastify';
import { ESchemasIds, EResponseMessages } from '../models/enums/_index';

/**
 * @description Seasons API.
 * @prefix /
 */
export default async (fastify: FastifyInstance) => {

  /**
   * @description Get season objects.
   * @route GET /seasons
   */
  fastify.route({
    method: 'GET',
    url: '/seasons',
    schema: fastify.getSchema(ESchemasIds.GETSeasons),
    handler: async function (request: Request, reply: Reply) {
      const { rows } = await this._movieService.getSeasons();
      reply
        .code(200)
        .send(rows);
    },
  });

  /**
   * @description Create a new season and its episodes.
   * @route POST /admin/seasons
   */
  fastify.route({
    method: 'POST',
    url: '/admin/seasons',
    schema: fastify.getSchema(ESchemasIds.POSTSeasonsAsAdmin),
    onRequest: [fastify.isAdmin],
    handler: async function (request: Request<{ Body: { year: number, season_number: number } }>, reply: Reply) {
      const { _movieService, _dateService } = this;
      const { year, season_number } = request.body;
      const firstMonday = _dateService.getFirstMondayOfYear(request.body.year);
      await _movieService.insertNewSeason(year, season_number, firstMonday);
      reply
        .code(200)
        .send({ message: EResponseMessages.SEASON_CREATED_SUCCESS });
    },
  });  
};
