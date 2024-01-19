import type { PoolClient } from 'pg';
import type { GetSeasonByNumberFn, GetSeasonsFn } from './types';

export default async (postgres: PoolClient) => {
    /**
     * Get all seasons.
     */
    const getSeasons: GetSeasonsFn = async () =>
        await postgres.query({
            text: 'SELECT * FROM seasonView;',
        });

    /**
     * Get one season by season number.
     */
    const getSeasonByNumber: GetSeasonByNumberFn = async seasonNumber => {
        const { rowCount, rows } = await postgres.query({
            text: 'SELECT * FROM season WHERE number = $1;',
            values: [seasonNumber],
        });
        if (!rowCount) throw new ServerError(404);
        return rows[0];
    };

    return {
        getSeasons,
        getSeasonByNumber,
    };
};
