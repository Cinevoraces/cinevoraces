import { type FastifyReply as Reply, type FastifyRequest as Request } from 'fastify';
import plugin from 'fastify-plugin';
import schemas from './schemas';
import createService from './service';
import { type GETSeasonByNumberRequest } from './types';

export default plugin(async fastify => {
    const { getSeasons, getSeasonByNumber } = await createService(fastify.postgres);
    fastify.addSchemas(schemas);

    fastify.route({
        method: 'GET',
        url: '/seasons',
        schema: fastify.getSchema('API:GET/seasons'),
        handler: async (request: Request, reply: Reply) => {
            const { rows } = await getSeasons();
            reply.code(200).send(rows);
        },
    });

    fastify.route({
        method: 'GET',
        url: '/seasons/:number',
        schema: fastify.getSchema('API:GET/seasons/:number'),
        handler: async (request: Request<GETSeasonByNumberRequest>, reply: Reply) => {
            const { number } = request.params;
            const season = await getSeasonByNumber(number);
            reply.code(200).send(season);
        },
    });
});
