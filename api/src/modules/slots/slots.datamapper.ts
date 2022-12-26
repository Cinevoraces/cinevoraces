import type { Query } from '../../types/_index';
import { queryBuilder } from '../../utils/queryBuilder';

/**
 * **getSlots**
 * @description Get slots according to query.
 * @param querystring URL querystring.
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
    text: ` SELECT * FROM "slot"
            ${WHERE?.count ? `WHERE ${WHERE.query}` : ''}
            ${ORDERBY}
            ${LIMIT};`,
    values,
  };
};

/**
 * **updateSlot**
 * @param id Slot id.
 * @param is_booked *is_booked* new value.
 * @description Update booking status of one slot.
 * @returns SQL query object
 */
export const updateSlot = (
  id: number,
  is_booked: boolean
): Query.preparedQuery => {
  return {
    text: ` UPDATE "slot"
            SET is_booked=$2
            WHERE id=$1;`,
    values: [id, is_booked],
  };
};
