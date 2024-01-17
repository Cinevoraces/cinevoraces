/**
 * Returns a SQL query object with numbered parameters, ready to be used with the pg library.
 */
export const sql = (query: TemplateStringsArray, ...values: unknown[]) => {
    // const text = reduceSqlQuery(query);
    let valueIndex = 0;

    const text = query
        .reduce((prev, curr, i) => {
            const resolved = (() => {
                if (!values[i]) {
                    return '';
                } else if (typeof values[i] === 'string' && (values[i] as string).isSqlKeyword()) {
                    return values[i] as string;
                } else if (typeof values[i] === 'string') {
                    return ((values[i] as string).includes(',') ? ',$' : '$') + (valueIndex + 1);
                } else {
                    return String(values[i]);
                }
            })();

            if (!curr.isEmpty() && !resolved.isSqlKeyword()) valueIndex++;

            return prev + curr + resolved;
        }, '')
        .replace(/\s+/g, ' ')
        .trim();

    values = values.filter(v => v !== undefined && v !== '' && !(typeof v === 'string' && v.isSqlKeyword()));

    return { text, values };
};
