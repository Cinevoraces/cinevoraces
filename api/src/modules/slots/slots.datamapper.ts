import type { Query } from '@src/types/Query';
import { queryBuilder } from '@src/utils/queryBuilder';

/**
 * **getSlots**
 * @description
 * All slots where is_booked is false.
 * @returns SQL query object
*/
export const getSlots = (
  querystring: Query.querystring
): Query.preparedQuery => {
  const enumerator = [ 'id', 'is_booked', 'season_number', 'episode'];
  const { where } = querystring;
  let values = [] as Array<unknown>;
  let WHERE = { query: '', count: 0, values: [] as Array<unknown> };

  if (where) {
    WHERE = queryBuilder.where(where, 'AND', enumerator);
    values = WHERE.values as Array<unknown>;
  }
  return {

    text: ` SELECT * FROM "proposition_slot"
            ${WHERE?.count ? `WHERE ${WHERE.query}` : ''}
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
