import { type FastifyReply as Reply, type FastifyRequest as Request } from 'fastify';
import plugin from 'fastify-plugin';
import schemas from './schemas';
import createService from './service';

export default plugin(async fastify => {
    const { getAvailableEpisodes } = await createService(fastify.postgres);
    fastify.addSchemas(schemas);

    fastify.route({
        method: 'GET',
        url: '/episodes',
        schema: fastify.getSchema('API:GET/episodes'),
        onRequest: [fastify.verifyAccessToken],
        handler: async (request: Request, reply: Reply) => {
            const { rows } = await getAvailableEpisodes();
            reply.code(200).send(rows);
        },
    });
});
