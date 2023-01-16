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
   * @description Get poster image's public URL.
   * @route GET /poster/:fileName
   * @param {string} fileName - File name.
   * @returns {string} - Public URL.
   */
  fastify.route({
    method: 'GET',
    url: '/poster/:fileName',
    schema: fastify.getSchema(ESchemasIds.GETPosterByFileName),
    handler: async function (request: Request<{ Params: { fileName: string } }>, reply: Reply) {
      reply.sendFile(`${this._fileService.paths.poster}/${request.params.fileName}`);
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
