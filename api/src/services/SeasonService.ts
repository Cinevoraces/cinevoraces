import type { Season } from '@src/types';
import Service from './Service';

type CreateSeasonFn = (year: number, seasonNumber: number) => Promise<void>;
type GetSeasonByNumberFn = (seasonNumber: number) => Promise<Season>;
type GetSeasonsFn = () => Promise<{
    rowCount: number;
    rows: Array<unknown>;
}>;

export default class SeasonService extends Service {
    /**
     * Get all seasons.
     */
    getSeasons: GetSeasonsFn = async () =>
        await this.postgres.query({
            text: 'SELECT * FROM seasonView;',
        });

    /**
     * Get one season by season number.
     */
    getSeasonByNumber: GetSeasonByNumberFn = async seasonNumber => {
        const { rowCount, rows } = await this.postgres.query({
            text: 'SELECT * FROM seasonView WHERE season_number = $1;',
            values: [seasonNumber],
        });
        if (!rowCount) throw new ServerError(404);
        return rows[0];
    };

    /**
     * Create a new season and it's episodes.
     */
    createSeason: CreateSeasonFn = async (year, seasonNumber) => {
        const day = Date.firstDayOfYear('monday', year);

        await this.postgres.query({
            text: 'SELECT new_season($1, $2, $3);',
            values: [seasonNumber, year, day],
        });
    };
}
