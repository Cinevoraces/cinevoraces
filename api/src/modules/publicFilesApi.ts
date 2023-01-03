import type { FastifyInstance, FastifyRequest as Request } from 'fastify';

export const publicFilesApi = async (fastify: FastifyInstance) => {

  // GET MOVIE POSTER FILE
  fastify.route({
    method: 'GET',
    url: '/public/poster/:fileName',
    handler: (request: Request<{ Params: { fileName: string }; }>, reply) => {
      reply.sendFile(`${process.env.STORAGE_POSTER}/${request.params.fileName}`);
    }
  });
};
