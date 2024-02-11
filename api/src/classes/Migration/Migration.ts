import { readFileSync, readdirSync } from 'fs';
import { sep } from 'path';
import type { PoolClient } from 'pg';

export default class Migration {
    public name: string;
    public up: string;
    public down: string;
    public error?: string;
    public skiped?: boolean;

    private pgClient: PoolClient;

    constructor(filePath: string, query: string, pgClient: PoolClient) {
        this.name = filePath.split('.sql')[0];
        this.parseUp(query);
        this.parseDown(query);
        this.pgClient = pgClient;
    }

    public static getMigrations = (pgClient: PoolClient) => {
        const folder = `${process.cwd()}${sep}migrations`;
        const migrations = readdirSync(folder)
            .filter(f => f.endsWith('.sql'))
            .sort()
            .map(fileName => {
                const query = readFileSync(folder + sep + fileName).toString();
                return new Migration(fileName, query, pgClient);
            });
        return migrations;
    };

    public static removeComments = (sql: string) => sql.replace(/(\/\*[^*]*\*\/)|(\/\/[^*]*)|(--[^.].*)/gm, '');

    /**
     * Apply the migration to the database.
     * - If the migration table does not exist, it will be created.
     * - If the migration already exists, it will be skipped.
     * - If an error occurs, it will be stored in the error property.
     * - If the migration is applied successfully, it will be stored in the migration table.
     */
    public apply = async () => {
        try {
            if (await this.isMigrationExists()) {
                this.skiped = true;
                return;
            }
            await this.pgClient.query(this.up);
            await this.insertMigration();
        } catch (e) {
            this.error = `\x1b[31m\n- ${this.name}:\n \x1b[0m${e.message}\n`;
        }
    };

    /**
     * Rollback the migration from the database.
     */
    public rollback = async () => {
        await this.pgClient.query(this.down);
        await this.removeMigration();
    };

    private parseUp = (query: string) => {
        query = query.split('-- MIGRATION DOWN')[0];
        query = Migration.removeComments(query);
        this.up = query;
    };

    private parseDown = (query: string) => {
        query = query.split('-- MIGRATION DOWN')[1];
        query = Migration.removeComments(query);
        this.down = query;
    };

    private isMigrationExists = async (retry?: boolean) => {
        try {
            const { rows } = await this.pgClient.query('SELECT * FROM migration WHERE name = $1', [this.name]);
            return rows.length > 0;
        } catch (e) {
            this.createMigrationTable();
            if (retry) throw e;
            this.isMigrationExists(true);
        }
    };

    private insertMigration = async () => {
        await this.pgClient.query('INSERT INTO migration (name) VALUES ($1)', [this.name]);
    };

    private removeMigration = async () => {
        await this.pgClient.query('DELETE FROM migration WHERE name = $1', [this.name]);
    };

    private createMigrationTable = async () => {
        await this.pgClient.query('CREATE TABLE IF NOT EXISTS migration (name TEXT PRIMARY KEY)');
    };
}
