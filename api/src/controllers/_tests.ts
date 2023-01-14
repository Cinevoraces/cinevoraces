import type {
  FastifyInstance,
  FastifyRequest as Request,
  FastifyReply as Reply,
} from 'fastify';
import { ESchemasIds } from '../models/enums/_index';

/**
 * @description Test API.
 * @prefix /test
 */
export default async (fastify: FastifyInstance) => {

  fastify.route({
    method: 'POST',
    url: '/post-images',
    schema: fastify.getSchema(ESchemasIds.GETPosterByFileName),
    handler: async function (
      request: Request<{ Body: Array<string> }>,
      reply: Reply
    ) {
      const { downloadFile, saveFile, generateGuid, paths, files } = this._fileService;
      
      // Download files
      for (const url of request.body) 
        files.push(await downloadFile(url));
        
      // Save files to temp directory
      files.forEach(async (f, i) => {
        f.filename = `${generateGuid()}.${f.ext}`;
        f.path = paths.temp;

        await saveFile(`${files[i].path}/${files[i].filename}`, f.stream);
      });

      reply.send(files);
    },
  });
};
