import type { Episode } from '@src/types';
import plugin from 'fastify-plugin';

export type GetAvailableEpisodesFn = () => Promise<{ rowCount: number; rows: Array<Episode> }>;

export default plugin(async fastify => {
    const { postgres } = fastify;

    const getAvailableEpisodes = async (): Promise<{
        rowCount: number;
        rows: Episode[];
    }> => {
        const { rowCount, rows } = await postgres.query({
            text: ` 
                SELECT ep.id, ep.season_number, ep.episode_number, ep.publishing_date
                FROM "episode" ep
                    LEFT JOIN (SELECT "movie".id, "movie".episode_id FROM movie) mv ON mv.episode_id = ep.id
                WHERE mv.id IS NULL
                    AND ep.publishing_date >= (NOW() - interval '6 days')
                    AND ep.publishing_date < (NOW() + interval '1 month')
                ORDER BY ep.publishing_date ASC
                LIMIT 5;
            `,
        });
        return { rowCount, rows };
    };

    fastify.decorate('services', {
        ...fastify.services,
        episodeService: {
            getAvailableEpisodes,
        },
    });
});

declare module 'fastify' {
    interface FastifyInstance {
        services: {
            episodeService: {
                getAvailableEpisodes: GetAvailableEpisodesFn;
            };
        };
    }
}
