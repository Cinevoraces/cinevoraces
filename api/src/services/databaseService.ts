import type { PoolClient } from 'pg';

/**
 * @description DatabaseService contains shared SQL query methods, meant to be extended by other services.
 * Any SQL/Querystring methods that are shared between services should be placed here.
 */
export default class DatabaseService {
    private _client: PoolClient;

    constructor(client: PoolClient) {
        this._client = client;
    }

    /**
     * @description Connect a client to the pool to execute a SQL query before releasing it.
     * @param {object} query SQL query to be executed.
     * @returns {object} Object containing the number of affected rows and the rows.
     */
    public async requestDatabase(
        query: { text: string; values?: Array<unknown> },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ): Promise<{ rowCount: number; rows: Array<any> }> {
        const { rowCount, rows } = await this._client.query(query);
        return { rowCount, rows };
    }

    /**
     * @description Reduce objects of fields to a "SELECT" SQL query.
     * @param {object} columns Object containing the fields to be selected.
     * @param {array} safeCheck Array of strings containing an enum of authorized columns.
     * @returns {string} String containing the "SELECT" SQL query.
     */
    public reduceSelect(columns: Record<string, unknown>, safeCheck: Array<string>): string {
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
    }

    /**
     * @description Reduce objects of fields to a "WHERE" SQL query.
     * @param {object} columns Object containing the fields to be selected.
     * @param {string} join 'AND' | 'OR' | ','
     * @param {array} safeCheck Array of strings containing an enum of authorized columns.
     * @param {number} count Where values counter should start.
     * @returns {object} Object containing the "WHERE" SQL query, the count of values, and the values.
     */
    public reduceWhere(
        columns: Record<string, unknown>,
        join: 'AND' | 'OR' | ',',
        safeCheck: Array<string>,
        count?: number,
    ): { query: string; count: number; values: Array<unknown> } {
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
    }
}
