import type {
  FastifyInstance,
  FastifyRequest as Request,
  FastifyReply as Reply,
} from 'fastify';
import { ESchemasIds } from '../models/enums/_index';

/**
 * @description File serving API.
 * @prefix /public
 */
export default async (fastify: FastifyInstance) => {

  /**
   * @description Get movie's poster file.
   * @route GET /poster/:movieId
   * @param {number} movieId - Movie's id.
   * @returns Poster image.
   */
  fastify.route({
    method: 'GET',
    url: '/poster/:movieId',
    schema: fastify.getSchema(ESchemasIds.GETPosterById),
    handler: async function (request: Request<{ Params: { movieId: number } }>, reply: Reply) {
      const { _fileService } = this;
    },
  });

  /**
   * @description Get file avatar.
   * @route GET /avatar/:userId
   * @param {number} userId - User's id.
   * @returns User avatar.
   */
  fastify.route({
    method: 'GET',
    url: '/avatar/:userId',
    schema: fastify.getSchema(ESchemasIds.GETAvatarById),
    handler: async function (request: Request<{ Params: { userId: number } }>, reply: Reply) {
      // TODO: Build file from data
      // reply.sendFile();
    },
  });

  // fastify.route({
  //   method: 'GET',
  //   url: '/fetchTMDBPosters',
  //   handler: async (request: Request, reply: Reply) => {
  //     const { fileManager, pgClient } = request;
  //     const { rows: movies } = await pgClient.query(
  //       ` SELECT id, poster_url
  //         FROM movie;`
  //     );
  //     movies.forEach(async ({ id, poster_url }) => {
  //       const fileName = await fileManager.saveFileFromExternalApi(poster_url);
  //       await pgClient.query('UPDATE movie SET poster_url = $1 WHERE id = $2;', [`/public/poster/${fileName}`, id]);
  //     });
  //     reply.send('Woopidooh!');
  //   },
  // });
};
