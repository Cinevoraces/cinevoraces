interface query {
  columns: Record<string, unknown>,
  operator: 'WHERE' | 'SET',
  join?: 'AND' | 'OR' | ','
}

/**
 * **fieldsReducer**
 * @description
 * Reduce objects of fields to an SQL query.
 * Be careful, you need to pass values in the same order as you pass your queries!
 * @param fields Contain fields and values to filter/set.
 * @param operator 'WHERE' | 'SET'
 * @param join 'AND' | 'OR' | ','
*/
export const queryBuilder = (
  fields: Array<query>
): Array<string> => {
  if (fields.length === 0) throw new Error('No fields provided');
  const returnArray: Array<string> = [];
  let count = 0;

  fields.forEach((field) => {
    const { columns, operator, join } = field;
    const keys = Object.keys(columns);
    if (keys.length > 1 && !join) throw new Error('Join method must be provided for multiple fields');
    returnArray.push(`${operator} ` + keys.reduce(
      (acc, key, index) => {
        if (typeof key === 'undefined') return acc;
        return [...acc, `${key}=$${Number([index]) + 1 + count}`];
      }, []
    ).join(` ${join} `));
    count += keys.length;
  });

  return returnArray;
};
