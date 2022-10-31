import type { Query } from '@src/types/Query';
import { queryBuilder } from '@src/utils/queryBuilder';

/**
 * **getUsers**
 * @description
 * Get users according to query.
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
  let values = [] as Array<unknown>;
  const { select: selectQuery, where: whereQuery } = querystring;
  let SELECT: string = undefined;
  let WHERE = { query: '', count: 0, values: [] as Array<unknown> };

  if (selectQuery) {
    SELECT = queryBuilder.select(selectQuery, enums.select);
  }
  if (whereQuery) {
    WHERE = queryBuilder.where(whereQuery, 'AND', enums.where);
    values = WHERE.values as Array<unknown>;
  }

  return {
    text: ` SELECT id, pseudo, mail, avatar_url, role, created_at, updated_at
            ${SELECT ? `,${SELECT}` : ''}
            FROM userview
            ${WHERE?.count ? `WHERE ${WHERE.query}` : ''}
    ;`,
    values,
  };
};

/**
 * **updateUser**
 * @description
 * Get users according to query.
 * @param querystring - URL querystring.
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
