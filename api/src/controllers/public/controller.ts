import { PublicService } from '@src/services';
import { type FastifyReply as Reply, type FastifyRequest as Request } from 'fastify';
import plugin from 'fastify-plugin';
import schemas from './schemas';
import type { GETPublicRessourceRequest } from './types';

export default plugin(async fastify => {
    const publicService = new PublicService(fastify.postgres);
    fastify.addSchemas(schemas);

    fastify.route({
        method: 'GET',
        url: '/ping',
        handler: async (_, reply: Reply) => reply.send('pong'),
    });

    fastify.route({
        method: 'GET',
        url: '/:docType/:entityId',
        schema: fastify.getSchema('API:GET/:docType/:entityId'),
        handler: async (request: Request<GETPublicRessourceRequest>, reply: Reply) => {
            const { docType, entityId } = request.params;
            const path = await publicService.getDocumentById(docType, entityId);
            await reply.sendFile(path);
        },
    });
});
