import { type FastifyReply as Reply, type FastifyRequest as Request } from 'fastify';
import plugin from 'fastify-plugin';
import schemas from './schemas';
import createService from './service';

export default plugin(async fastify => {
    const { getDocumentById } = await createService(fastify.postgres);
    fastify.addSchemas(schemas);

    fastify.route({
        method: 'GET',
        url: '/:docType/:entityId',
        schema: fastify.getSchema('API:GET/:docType/:entityId'),
        handler: async function (request: Request<{ Params: { docType: string; entityId: number } }>, reply: Reply) {
            const { docType, entityId } = request.params;
            const path = await getDocumentById(docType, entityId);
            await reply.sendFile(path);
        },
    });
});
