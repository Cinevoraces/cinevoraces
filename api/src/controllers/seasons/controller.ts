import { SeasonService } from '@src/services';
import { type FastifyReply as Reply, type FastifyRequest as Request } from 'fastify';
import plugin from 'fastify-plugin';
import schemas from './schemas';
import { type GETSeasonByNumberRequest } from './types';

export default plugin(async fastify => {
    const seasonService = new SeasonService(fastify.postgres);
    fastify.addSchemas(schemas);

    fastify.route({
        method: 'GET',
        url: '/seasons',
        schema: fastify.getSchema('API:GET/seasons'),
        handler: async (request: Request, reply: Reply) => {
            const { rows } = await seasonService.getSeasons();
            reply.code(200).send(rows);
        },
    });

    fastify.route({
        method: 'GET',
        url: '/seasons/:number',
        schema: fastify.getSchema('API:GET/seasons/:number'),
        handler: async (request: Request<GETSeasonByNumberRequest>, reply: Reply) => {
            const { number } = request.params;
            const season = await seasonService.getSeasonByNumber(number);
            reply.code(200).send(season);
        },
    });
});
