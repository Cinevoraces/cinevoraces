import type { FastifyInstance, FastifyRequest as Request } from 'fastify';
import {
  publicFilesPostersSchema,
  publicFilesAdminGetAllPostersSchema
} from './publicFiles.schema';

export const publicFilesApi = async (fastify: FastifyInstance) => {

  // GET MOVIE POSTER FILE
  fastify.route({
    method: 'GET',
    url: '/public/poster/:fileName',
    schema: publicFilesPostersSchema,
    handler: (request: Request<{ Params: { fileName: string }; }>, reply) => {
      reply.sendFile(`${process.env.STORAGE_POSTER}/${request.params.fileName}`);
    }
  });

  /**
   * **Fetch TMDB's posters**
   * @description
   * Look for every movie that has a poster stored in TMDB's API,
   * fetch the poster and store it locally.
   * @warning
   * THIS ROUTE IS NOT INTENDED TO BE USED IN PRODUCTION.
   */
  fastify.route({
    method: 'GET',
    url: '/fetchTMDBPosters',
    schema: publicFilesAdminGetAllPostersSchema,
    onRequest: [fastify.isAdmin],
    preValidation: [fastify.verifyPassword],
    handler: async (request: Request, reply) => {
      const { fileManager, pgClient } = request;

      const { rows: movies } = await pgClient.query(
        ` SELECT id, poster_url 
          FROM movie;`
      );

      movies.forEach(async ({ id, poster_url }) => {
        const fileName = await fileManager.saveFileFromExternalApi(poster_url);
        await pgClient.query('UPDATE movie SET poster_url = $1 WHERE id = $2;', [`/public/poster/${fileName}`, id]);
      });
      
      reply.send('Woopidooh!');
    }
  });
};
