/**
 * Returns a SQL query with numbered parameters. This is intended to be used with the sql() function.
 */
export const reduceSqlQuery = (query: TemplateStringsArray) => query.reduce((prev, curr, i) => prev + '$' + i + curr);

/**
 * Returns a SQL query object with numbered parameters, ready to be used with the pg library.
 */
export const sql = (query: TemplateStringsArray, ...values: unknown[]) => {
    const text = reduceSqlQuery(query);
    return { text, values };
};
