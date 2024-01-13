import type { PoolClient } from 'pg';
import { sql as buildSqlQuery } from './utils/sql';

export interface ClientOpts {
    client?: PoolClient;
}

export default class Database {
    private client: PoolClient;

    constructor(opts?: ClientOpts) {
        this.client = opts.client;
    }

    /**
     * Returns a SQL query object with numbered parameters, ready to be used with the database.
     */
    public sql(query: TemplateStringsArray, ...values: unknown[]) {
        return buildSqlQuery(query, ...values);
    }

    /**
     * Runs a SQL query.
     */
    public async query<T>(query: TemplateStringsArray, ...values: unknown[]) {
        const { rowCount, rows } = await this.client.query(this.sql(query, ...values));
        return { rowCount, rows: rows as T[] };
    }
}
