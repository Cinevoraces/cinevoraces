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
): { query: string, count: number } => {
  if (columns === undefined || columns === null) return { query: '', count: 0 };
  const keys = Object.keys(columns);
  const query = keys.reduce((acc, key, index) => {
    if (typeof key === 'undefined') return acc;
    return [...acc, `${key}=$${Number(index+1) + (count || 0)}`];
  }, []).join(` ${join} `);
  return { query, count: (count || keys.length) };
};
