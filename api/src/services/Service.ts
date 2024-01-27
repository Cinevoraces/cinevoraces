import type { PoolClient } from 'pg';

export default class Service {
    public postgres: PoolClient;

    constructor(postgres: PoolClient) {
        this.postgres = postgres;
    }

    /**
     * Reduce objects of fields to a "SELECT" SQL query.
     */
    public reduceSelect = (columns: Record<string, unknown>, safeCheck: Array<string>): string => {
        const keys = Object.keys(columns);
        if (keys.length === 0) return undefined;
        const query = keys
            .reduce((acc, key) => {
                // Check if key exist in safeCheck
                if (safeCheck.find(value => value === key)) {
                    if (columns[key] === false) {
                        return [...acc];
                    } else {
                        return [...acc, `${key}`];
                    }
                } else {
                    throw new Error(`Unauthorized query argument: "${key}"`);
                }
            }, [])
            .join(', ');

        return query.length > 0 ? query : undefined;
    };

    /**
     * Reduce objects of fields to a "WHERE" SQL query.
     */
    public reduceWhere = (
        columns: Record<string, unknown>,
        join: 'AND' | 'OR' | ',',
        safeCheck: Array<string>,
        count?: number,
    ): { query: string; count: number; values: Array<unknown> } => {
        if (columns === undefined || columns === null) return { query: '', count: 0, values: [] };
        const keys = Object.keys(columns);
        const values = Object.values(columns);
        const query = keys
            .reduce((acc, key, index) => {
                // Check if key exist in safeCheck
                if (safeCheck.find(value => value === key)) {
                    // Return the key and the value index according to *count* variable
                    return [...acc, `${key}=$${Number(index + 1) + (count || 0)}`];
                } else {
                    throw new Error(`Unauthorized query argument: "${key}"`);
                }
            }, [])
            .join(` ${join} `);

        return {
            query,
            count: count || keys.length,
            values,
        };
    };
}
