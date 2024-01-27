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
            const { rows, rowCount } = await fastify.postgres.query({
                text: 'SELECT * FROM metricsView;',
            });

            if (!rowCount) throw new ServerError(500, 'METRICS_COULD_NOT_GET');
            reply.code(200).send(rows[0]);
        },
    });
});
