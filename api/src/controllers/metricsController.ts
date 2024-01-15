import { ESchemasIds } from '@src/types';
import { type FastifyInstance, type FastifyReply as Reply, type FastifyRequest as Request } from 'fastify';

/**
 * @description Metrics API.
 * @prefix /
 */
export default async (fastify: FastifyInstance) => {
    /**
     * @description Get Website global metrics from database.
     * @route GET /metrics
     */
    fastify.route({
        method: 'GET',
        url: '/metrics',
        schema: fastify.getSchema(ESchemasIds.GETMetrics),
        handler: async function (request: Request, reply: Reply) {
            const { rows } = await this._movieService.requestDatabase({
                text: 'SELECT * FROM metricsView;',
            });

            reply.code(200).send(rows[0]);
        },
    });
};
