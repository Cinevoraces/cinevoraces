import { reduceSqlQuery, sql } from '../../src/classes/Database/utils/sql';

describe('Database/sql/utils.ts', () => {
    it('reduceSqlQuery()', () => {
        // Prepare test conditions
        // (has to be a function because of the way reduceSqlQuery() works)
        const testFunc = (query: TemplateStringsArray, ..._: unknown[]) => {
            const reducedSqlQuery = reduceSqlQuery(query);
            expect(reducedSqlQuery).toEqual('SELECT * FROM users WHERE id = $1;');
            return reducedSqlQuery;
        };

        // Run test
        testFunc`SELECT * FROM users WHERE id = ${10};`;
    });

    it('sql()', () => {
        const id = 158;
        const query = sql`SELECT * FROM users WHERE id = ${id};`;
        expect(query).toEqual({ text: 'SELECT * FROM users WHERE id = $1;', values: [158] });

        const query2 = sql`SELECT * FROM users WHERE id = ${id} AND name = ${'John'};`;
        expect(query2).toEqual({ text: 'SELECT * FROM users WHERE id = $1 AND name = $2;', values: [158, 'John'] });

        const query3 = sql`
            SELECT * FROM users 
            WHERE 
                id = ${id} 
                AND name = ${'John'} 
                AND age = ${25};
        `;

        expect(query3).toEqual({
            text:
                '\n' +
                '            SELECT * FROM users \n' +
                '            WHERE \n' +
                '                id = $1 \n' +
                '                AND name = $2 \n' +
                '                AND age = $3;\n' +
                '        ',
            values: [158, 'John', 25],
        });
    });
});
