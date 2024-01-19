import { type FastifyReply as Reply, type FastifyRequest as Request } from 'fastify';
import plugin from 'fastify-plugin';
import schemas from './schemas';

export default plugin(async fastify => {
    fastify.addSchemas(schemas);

    fastify.route({
        method: 'GET',
        url: '/metrics',
        schema: fastify.getSchema('API:GET/metrics'),
        handler: async (request: Request, reply: Reply) => {
            const { rows } = await fastify.postgres.query({
                text: 'SELECT * FROM metricsView;',
            });

            reply.code(200).send(rows[0]);
        },
    });
});
