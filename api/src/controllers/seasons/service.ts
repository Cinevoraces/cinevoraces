import type { PoolClient } from 'pg';
import type { GetSeasonByNumberFn, GetSeasonsFn } from './types';

export default async (postgres: PoolClient) => {
    /**
     * Get all seasons.
     */
    const getSeasons: GetSeasonsFn = async () => {
        const { rowCount, rows } = await postgres.query({
            text: 'SELECT * FROM seasonView;',
        });
        return { rowCount, rows };
    };

    /**
     * Get one season by season number.
     */
    const getSeasonByNumber: GetSeasonByNumberFn = async seasonNumber => {
        const { rowCount, rows } = await postgres.query({
            text: 'SELECT * FROM season WHERE number = $1;',
            values: [seasonNumber],
        });

        return rowCount ? rows[0] : null;
    };

    return {
        getSeasons,
        getSeasonByNumber,
    };
};
