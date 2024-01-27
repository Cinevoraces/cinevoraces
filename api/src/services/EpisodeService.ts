import type { Episode } from '@src/types';
import Service from './Service';

type GetAvailableEpisodesFn = () => Promise<{ rowCount: number; rows: Array<Episode> }>;

export default class EpisodeService extends Service {
    /**
     * Get available episodes.
     */
    getAvailableEpisodes: GetAvailableEpisodesFn = async () =>
        await this.postgres.query({
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
}
