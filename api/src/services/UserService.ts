import type { FastifyPluginCallback } from 'fastify';
import plugin from 'fastify-plugin';
import type { PoolClient } from 'pg';
import type { PQuerystring, PUser } from '../models/types/_index';
import DatabaseService from './databaseService';

/**
 * @description UserService contains movies and SQL query related methods
 * related to users routes.
 */
class UserService extends DatabaseService {
    constructor(client: PoolClient) {
        super(client);
    }

    /**
     * @description Get users using query parameters.
     * @param {object} query object containing queries parameters
     * @param {boolean} query determines if selected infos are public or private
     * @param {number} id facultative user's id in case of fetching users/me endpoint
     * @returns Array of users.
     */
    public async getUsersByQuery(
        query: PQuerystring,
        isPrivate: boolean,
        id?: number,
    ): Promise<{ rowCount: number; rows: Array<PUser> }> {
        const enums = {
            where: isPrivate ? [] : ['id', 'pseudo', 'mail', 'role'], // No WHERE clause for users/me
            select: ['propositions', 'reviews', 'metrics', 'movies'],
        };

        const { select, where, limit, sort } = query;
        let values = [] as Array<unknown>,
            SELECT: string = undefined,
            WHERE = { query: '', count: 0, values: [] as Array<unknown> },
            ORDERBY = '',
            LIMIT = '';

        // Build SELECT query
        if (select) {
            SELECT = this.reduceSelect(select, enums.select);
        }
        // Build WHERE query
        if (where) {
            WHERE = this.reduceWhere(where, 'AND', enums.where);
            values = WHERE.values as Array<unknown>;
        }
        // Specific WHERE query for /users/me endpoint
        if (isPrivate) {
            WHERE = { query: 'id=$1', count: 1, values: [id] as Array<unknown> };
            values = WHERE.values;
        }
        // Build ORDERBY query
        if (sort === 'asc' || sort === 'desc') {
            ORDERBY = `ORDER BY id ${sort}`;
        }
        // Build LIMIT query
        if (typeof limit === 'number' && limit > 0) {
            LIMIT = `LIMIT ${limit}`;
        }

        const { rowCount, rows } = await this.requestDatabase({
            text: ` SELECT id, pseudo, ${isPrivate ? 'mail, ' : ''}role, created_at, updated_at
              ${SELECT ? `,${SELECT}` : ''}
              FROM userview
              ${WHERE?.count ? `WHERE ${WHERE.query}` : ''}
              ${ORDERBY}
              ${LIMIT};`,
            values,
        });

        console.log(
            ` SELECT id, pseudo, ${isPrivate ? 'mail, ' : ''}role, created_at, updated_at
    ${SELECT ? `,${SELECT}` : ''}
    FROM userview
    ${WHERE?.count ? `WHERE ${WHERE.query}` : ''}
    ${ORDERBY}
    ${LIMIT};`,
            values,
        );

        return { rowCount, rows };
    }

    /**
     * @description Update one user.
     * @param {number} id user's id
     * @param {object} set object containing updated user's data
     */
    public async updateUser(id: number, set: Record<string, unknown>): Promise<void> {
        const enumerator = ['pseudo', 'mail', 'password'];
        const SET = this.reduceWhere(set, ',', enumerator, 1);
        await this.requestDatabase({
            text: ` UPDATE "user"
              SET ${SET.query}
              WHERE id=$1;`,
            values: [id, ...SET.values],
        });
    }

    /**
     * @description Delete one user.
     * @param {number} id User's id.
     */
    public async deleteUser(id: number): Promise<void> {
        await this.requestDatabase({
            text: ' DELETE FROM "user" WHERE id=$1;',
            values: [id],
        });
    }
}

// Decorate FastifyInstance with UserService
export type TUserService = InstanceType<typeof UserService>;
export default plugin((async (fastify, opts, done) => {
    // Check if service is already registered
    if (fastify.hasDecorator('_userService')) return fastify.log.warn('userService already registered');

    const UserServiceInstance = new UserService(fastify.postgres);
    fastify.decorate('_userService', { getter: () => UserServiceInstance });
    done();
}) as FastifyPluginCallback);
