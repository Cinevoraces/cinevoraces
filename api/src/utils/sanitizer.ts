/**
 * Sanitize HTML tags of a string
 */
export const sanitizeHTMLString = (htmlString: string): string => {
    const htmlTagRegex = /<([^>]+)>/gi;
    return htmlString.replace(htmlTagRegex, () => '');
};

/**
 * Sanitize HTML of every strings in an object
 */
export const sanitizeObject = (obj: Record<string, unknown>): Record<string, unknown> => {
    for (const key in obj) {
        if (typeof obj[key] === 'string') {
            obj[key] = sanitizeHTMLString(obj[key] as string);
        } else if (typeof obj[key] === 'object') {
            obj[key] = sanitizeObject(obj[key] as Record<string, unknown>);
        }
    }
    return obj;
};
