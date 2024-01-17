import type { GetUsers, QueryString, User } from '@src/types';
import plugin from 'fastify-plugin';
import DatabaseService from './databaseService';

export type GetUsersFn = (
    queryString: QueryString<GetUsers.Select, GetUsers.Where>,
    id?: number,
) => Promise<{ rowCount: number; rows: Array<User> }>;

export type UpdateUserFn = (id: number, payload: UpdateUserPayload) => Promise<void>;

export type DeleteUserFn = (id: number) => Promise<void>;

export interface UpdateUserPayload {
    pseudo?: string;
    mail?: string;
    password?: string;
}

export default plugin(async fastify => {
    const { postgres } = fastify;
    const dbService = new DatabaseService(postgres);

    /**
     * Get users using query parameters.
     * - Set *id* to get "me" as user.
     */
    const getUsers: GetUsersFn = async (queryString, id) => {
        const { select, where, limit, sort } = queryString;
        const isPrivate = id !== undefined;

        const enums = {
            where: isPrivate ? [] : ['id', 'pseudo', 'mail', 'role'], // No WHERE clause for users/me
            select: ['propositions', 'reviews', 'metrics', 'movies'],
        };
        let values = [] as Array<unknown>,
            SELECT: string = undefined,
            WHERE = { query: '', count: 0, values: [] as Array<unknown> },
            ORDERBY = '',
            LIMIT = '';

        if (select) {
            SELECT = dbService.reduceSelect(select as Record<string, unknown>, enums.select);
        }
        if (where) {
            WHERE = dbService.reduceWhere(where as Record<string, unknown>, 'AND', enums.where);
            values = WHERE.values as Array<unknown>;
        }
        if (isPrivate) {
            WHERE = { query: 'id=$1', count: 1, values: [id] as Array<unknown> };
            values = WHERE.values;
        }
        if (sort === 'asc' || sort === 'desc') {
            ORDERBY = `ORDER BY id ${sort}`;
        }
        if (typeof limit === 'number' && limit > 0) {
            LIMIT = `LIMIT ${limit}`;
        }

        const { rowCount, rows } = await dbService.requestDatabase({
            text: ` SELECT id, pseudo, ${isPrivate ? 'mail, ' : ''}role, created_at, updated_at
              ${SELECT ? `,${SELECT}` : ''}
              FROM userview
              ${WHERE?.count ? `WHERE ${WHERE.query}` : ''}
              ${ORDERBY}
              ${LIMIT};`,
            values,
        });

        return { rowCount, rows };
    };

    /**
     * Update one user.
     */
    const updateUser: UpdateUserFn = async (id, set) => {
        const enumerator = ['pseudo', 'mail', 'password'];
        const SET = dbService.reduceWhere(set as Record<string, unknown>, ',', enumerator, 1);
        await dbService.requestDatabase({
            text: ` UPDATE "user"
              SET ${SET.query}
              WHERE id=$1;`,
            values: [id, ...SET.values],
        });
    };

    /**
     * Delete one user.
     */
    const deleteUser: DeleteUserFn = async id => {
        await dbService.requestDatabase({
            text: ' DELETE FROM "user" WHERE id=$1;',
            values: [id],
        });
    };

    fastify.decorate('services', {
        ...fastify.services,
        userService: {
            getUsers,
            updateUser,
            deleteUser,
        },
    });
});

declare module 'fastify' {
    interface FastifyInstance {
        services: {
            userService: {
                getUsers: GetUsersFn;
                updateUser: UpdateUserFn;
                deleteUser: DeleteUserFn;
            };
        };
    }
}
