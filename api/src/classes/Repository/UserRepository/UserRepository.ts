import type { CreateUserPayload } from '@src/controllers/users/types';
import type { User } from '@src/types';
import type { PoolClient } from 'pg';
import type Query from '../../Query/Query';
import type { IRepository } from '../types';

export default class UserRepository implements IRepository<User, CreateUserPayload> {
    private client;

    constructor(client: PoolClient) {
        this.client = client;
    }

    getMany = async (query: Query) => {
        const { rows } = await this.client.query<User>({
            text: `${query.SELECT} FROM userview ${query.WHERE} ${query.SORT} ${query.LIMIT};`,
            values: query.values,
        });
        return rows;
    };

    getById = async (id: number) => {
        const { rows, rowCount } = await this.client.query<User>({
            text: 'SELECT * FROM userview WHERE id = $1;',
            values: [id],
        });
        return rowCount === 0 ? null : rows[0];
    };

    create = async ({ pseudo, mail, password }: CreateUserPayload) => {
        const { rows } = await this.client.query<User>({
            text: `INSERT INTO "user" (pseudo, mail, password) VALUES ($1, $2, $3) RETURNING *;`,
            values: [pseudo, mail, password],
        });
        return rows[0];
    };

    update = async ({ values, SET, WHERE }: Query) => {
        await this.client.query({
            text: `UPDATE "user" ${SET} ${WHERE}`,
            values,
        });
    };

    delete = async (id: number) => {
        await this.client.query({
            text: ' DELETE FROM "user" WHERE id=$1;',
            values: [id],
        });
    };
}
