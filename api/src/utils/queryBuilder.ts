/**
 * **queryBuilder**
 * @description
 * Reduce objects of fields to an SQL query.
 * @param columns - Object containing the fields to be selected.
 * @param join 'AND' | 'OR' | ','
 * @param safeCheck Array of strings containing an enum of authorized columns.
 * @param count Number of values to be inserted.
*/
export const queryBuilder = (
  columns: Record<string, unknown>,
  join: 'AND' | 'OR' | ',',
  safeCheck: Array<string>,
  count?: number 
): { query: string, count: number } => {
  if (columns === undefined || columns === null) return { query: '', count: 0 };
  const keys = Object.keys(columns);
  const query = keys.reduce((acc, key, index) => {
    if (safeCheck.find((value) => value === key)) {
      return [...acc, `${key}=$${Number(index+1) + (count || 0)}`];
    } else {
      throw new Error(`Unauthorized query argument: "${key}"`);
    }
  }, []).join(` ${join} `);
  return { query, count: (count || keys.length) };
};
