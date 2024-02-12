import type { PoolClient } from 'pg';
import Migration from '../../src/classes/Migration/Migration';

describe('Migration', () => {
    let pgClient: PoolClient;

    beforeEach(() => {
        pgClient = {
            query: jest.fn(),
        } as unknown as PoolClient;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('constructor()', () => {
        const filePath = '/path/to/migration.sql';
        const query = 'CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT);\n-- MIGRATION DOWN\nDROP TABLE users';
        const migration = new Migration(filePath, query, pgClient);
        expect(migration.name).toBe('/path/to/migration');
        expect(migration.up).toBe('CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT);\n');
        expect(migration.down).toBe('\nDROP TABLE users');
        expect(migration.error).toBeUndefined();
        expect(migration.skiped).toBeUndefined();
    });
});
