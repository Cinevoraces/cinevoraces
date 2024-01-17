const allowedKeywords = ['WHERE', 'AND', 'OR', 'LIMIT', 'ORDER BY'];

Object.assign(String.prototype, {
    isEmpty(): boolean {
        return this === undefined || this.trim() === '';
    },
    isSqlKeyword(): boolean {
        return allowedKeywords.includes(this);
    },
});

declare global {
    interface String {
        /**
         * Check if the string is empty or undefined.
         */
        isEmpty(): boolean;

        /**
         * Check if the string is an allowed SQL keyword.
         */
        isSqlKeyword(): boolean;
    }
}

export default String;
