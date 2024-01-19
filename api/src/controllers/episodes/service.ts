import type { PoolClient } from 'pg';
import type { GetAvailableEpisodesFn } from './types';

export default async (postgres: PoolClient) => {
    /**
     * Get available episodes.
     */
    const getAvailableEpisodes: GetAvailableEpisodesFn = async () =>
        await postgres.query({
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

    return {
        getAvailableEpisodes,
    };
};
