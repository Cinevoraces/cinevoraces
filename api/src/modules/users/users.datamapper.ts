import type { Query } from '@src/types/Query';
import { queryBuilder } from '@src/utils/queryBuilder';

/**
 * **getUsers**
 * @description Get users according to query.
 * @param querystring - URL querystring.
 * @returns SQL query object
 */
export const getUsers = (
  querystring: Query.querystring
): Query.preparedQuery => {
  const enums = {
    where: [ 'id', 'pseudo', 'mail', 'role'],
    select: ['propositions', 'reviews', 'metrics']
  };
  const { select, where, limit, sort } = querystring;
  let values = [] as Array<unknown>,
    SELECT: string = undefined,
    WHERE = { query: '', count: 0, values: [] as Array<unknown> },
    ORDERBY = '',
    LIMIT = '';

  // Build SELECT query
  if (select) {
    SELECT = queryBuilder.select(select, enums.select);
  }
  // Build WHERE query
  if (where) {
    WHERE = queryBuilder.where(where, 'AND', enums.where);
    values = WHERE.values as Array<unknown>;
  }
  // Build ORDERBY query
  if (sort === 'asc' || sort === 'desc') {
    ORDERBY = `ORDER BY id ${sort}`;
  }
  // Build LIMIT query
  if (typeof limit === 'number' && limit > 0) {
    LIMIT = `LIMIT ${limit}`;
  }

  return {
    text: ` SELECT id, pseudo, mail, avatar_url, role, created_at, updated_at
            ${SELECT ? `,${SELECT}` : ''}
            FROM userview
            ${WHERE?.count ? `WHERE ${WHERE.query}` : ''}
            ${ORDERBY}
            ${LIMIT}
    ;`,
    values,
  };
};

/**
 * **updateUser**
 * @description Update one user.
 * @param id - User id.
 * @param set - Object containing *pseudo | mail | password*.
 * @returns SQL query object
 */
export const updateUser = (
  id: number,
  set: Record<string, unknown>

): Query.preparedQuery => {
  const enumerator = ['pseudo', 'mail', 'password'];
  const SET = queryBuilder.where(set, ',', enumerator, 1);

  return {
    text: ` UPDATE "user"
            SET ${SET.query}
            WHERE id=$1
    ;`,
    values: [id, ...SET.values],
  };
};

/**
 * **deleteUser**
 * @description Delete one user.
 * @param id - User's id.
 * @returns SQL query object
 */
export const deleteUser = (
  id: number
): Query.preparedQuery => {
  return {
    text: ' DELETE FROM "user" WHERE id=$1;',
    values: [id],
  };
};
