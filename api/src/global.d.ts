// Module declaration for global variables must be set as var
/* eslint-disable no-var */

declare global {
    var sql: (query: TemplateStringsArray, ...values: unknown[]) => { text: string; values: unknown[] };
}

export {};
