import type { GetUsers, QueryString, User } from '@src/types';
import { sql } from '@src/utils';
import plugin from 'fastify-plugin';

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

    /**
     * Get users using query parameters.
     * - Set *id* to get "me" as user.
     */
    const getUsers: GetUsersFn = async (queryString, id) => {
        const { select, where, limit, sort } = queryString;
        const isPrivate = id !== undefined;
        const userId = id ?? where?.id;

        const query = sql`
            SELECT id, pseudo, role, created_at, updated_at
                ${isPrivate && ',mail'}
                ${select?.metrics && ',metrics'}
                ${select?.propositions && ',propositions'}
                ${select?.reviews && ',reviews'}
                ${select?.movies && ',movies'}
            FROM userview ${(where ?? userId) && 'WHERE'}
                ${userId && `id = ${userId}`}
                ${where?.pseudo && `pseudo=${where.pseudo}`}
                ${where?.mail && `mail=${where.mail}`}
                ${where?.role && `role=${where.role}`}
            ${sort && 'ORDER BY'} ${sort && `id ${sort}`}
            ${limit && 'LIMIT'} ${limit && ` ${limit}`}
            ;
        `;

        console.log(query);

        const { rowCount, rows } = await postgres.query(query);
        return { rowCount, rows };
    };

    /**
     * Update one user.
     */
    const updateUser: UpdateUserFn = async (id, set) => {
        const query = sql`
            UPDATE "user" SET 
                ${set.pseudo ? `pseudo=${set.pseudo}` : ''}
                ${set.mail ? `mail=${set.mail}` : ''}
                ${set.password ? `password=${set.password}` : ''}
            WHERE id=${id};
        `;

        await postgres.query(query);
    };

    /**
     * Delete one user.
     */
    const deleteUser: DeleteUserFn = async id => {
        const query = sql`
            DELETE FROM "user" WHERE id=${id};
        `;

        await postgres.query(query);
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
