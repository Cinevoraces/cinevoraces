/**
 * **queryBuilder**
 * @description
 * Reduce objects of fields to an SQL query.
 * @param columns - Object containing the fields to be selected.
 * @param join 'AND' | 'OR' | ','
 * @param count Number of values to be inserted.
*/
export const queryBuilder = (
  columns: Record<string, unknown>,
  join: 'AND' | 'OR' | ',',
  count?: number 
): { query: string, returnCount: number } => {
  if (columns === undefined || columns === null) return { query: '', returnCount: 0 };
  const keys = Object.keys(columns);
  let returnCount = count ? count : 0;
  const query = keys.reduce((acc, key, index) => {
    if (typeof key === 'undefined') return acc;
    returnCount ++;
    return [...acc, `${key}=$${Number([index]) + 1 + returnCount}`];
  }, []).join(` ${join} `);
  return { query, returnCount };
};
