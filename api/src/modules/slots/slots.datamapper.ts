import type { Query } from '@src/types/Query';
import { queryBuilder } from '@src/utils/queryBuilder';

/**
 * **getSlots**
 * @description Get slots according to query.
 * @param querystring - URL querystring.
 * @returns SQL query object
*/
export const getSlots = (
  querystring: Query.querystring
): Query.preparedQuery => {
  const enumerator = [ 'id', 'is_booked', 'season_number', 'episode'];
  const { where, limit, sort } = querystring;
  let values = [] as Array<unknown>,
    WHERE = { query: '', count: 0, values: [] as Array<unknown> },
    ORDERBY = '',
    LIMIT = '';

  // Build WHERE query
  if (where) {
    WHERE = queryBuilder.where(where, 'AND', enumerator);
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
    text: ` SELECT * FROM "proposition_slot"
            ${WHERE?.count ? `WHERE ${WHERE.query}` : ''}
            ${ORDERBY}
            ${LIMIT}
          ;`,
    values,
  };
};

/**
 * **updateSlot**
 * @param id - Slot id.
 * @param is_booked - *is_booked* new value.
 * @description
 * Update booking status of one slot.
 * @returns SQL query object
 */
export const updateSlot = (
  id: number,
  is_booked: boolean
): Query.preparedQuery => {
  return {
    text: ` UPDATE "proposition_slot"
            SET is_booked=$2
            WHERE id=$1
    ;`,
    values: [id, is_booked],
  };
};

/**
 * **getTokenObject**
 * @description 
 * Find a user by id or pseudo and return object for token construction.
 * @param value object containing *id or pseudo*
*/
export const getTokenObject = (
  value: { id: number } | { pseudo: string },
): Query.preparedQuery => {
  const column: string = Object.keys(value)[0];
  return {
    text: ` SELECT 
              id, pseudo, mail,
              password, role, avatar_url
            FROM "proposition_slot"
            WHERE ${Object.keys(value)[0]} = $1;`,
    values: [(value[column as keyof typeof value])],
  };
};
