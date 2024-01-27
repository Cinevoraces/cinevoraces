import { AuthService, EpisodeService } from '@src/services';
import { type FastifyReply as Reply, type FastifyRequest as Request } from 'fastify';
import plugin from 'fastify-plugin';
import schemas from './schemas';

export default plugin(async fastify => {
    const authService = new AuthService(fastify.postgres);
    const episodeService = new EpisodeService(fastify.postgres);
    fastify.addSchemas(schemas);

    fastify.route({
        method: 'GET',
        url: '/episodes',
        schema: fastify.getSchema('API:GET/episodes'),
        handler: async (request: Request, reply: Reply) => {
            await authService.verifyAccessToken(request);
            const { rows } = await episodeService.getAvailableEpisodes();
            reply.code(200).send(rows);
        },
    });
});
