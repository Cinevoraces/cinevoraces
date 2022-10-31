export const queryBuilder = {
  /**
 * **queryBuilder.select**
 * @description
 * Reduce objects of fields to a "SELECT" SQL query.
 * @param columns - Object containing the fields to be selected.
 * @param safeCheck Array of strings containing an enum of authorized columns.
*/
  select: (
    columns: Record<string, unknown>,
    safeCheck: Array<string> 
  ) => {
    const keys = Object.keys(columns);
    if (keys.length === 0) return undefined;
    const query = keys.reduce((acc, key) => {
      // Check if key exist in safeCheck
      if (safeCheck.find((value) => value === key)) {
        if (columns[key] === false) {
          return [...acc];
        } else {
          return [...acc, `${key}`];
        }
      } else {
        throw new Error(`Unauthorized query argument: "${key}"`);
      }
    }, []).join(', ');
    
    return query.length > 0 ? query : undefined;
  },

  /**
 * **queryBuilder.where**
 * @description
 * Reduce objects of fields to a "WHERE" SQL query.
 * @param columns - Object containing the fields to be selected.
 * @param join 'AND' | 'OR'
 * @param safeCheck Array of strings containing an enum of authorized columns.
 * @param count Where values counter should start.
*/
  where: (
    columns: Record<string, unknown>,
    join: 'AND' | 'OR',
    safeCheck: Array<string>,
    count?: number 
  ): { query: string, count: number, values: Array<unknown> } => {
    if (columns === undefined || columns === null) return { query: '', count: 0, values: []};
    const keys = Object.keys(columns);
    const values = Object.values(columns);
    const query = keys.reduce((acc, key, index) => {
      // Check if key exist in safeCheck
      if (safeCheck.find((value) => value === key)) {
        // Return the key and the value index according to *count* variable 
        return [...acc, `${key}=$${Number(index+1) + (count || 0)}`];
      } else {
        throw new Error(`Unauthorized query argument: "${key}"`);
      }
    }, []).join(` ${join} `);
  
    return { 
      query, count: (count || keys.length), values };
  },
};
