import { readFileSync, readdirSync } from 'fs';
import { sep } from 'path';

export const getMigrations = () => {
    const isDev = process.env.NODE_ENV === 'development';
    const folder = `${isDev ? process.cwd() : '/api'}${sep}migrations`;
    const migrations = readdirSync(folder)
        .filter(f => f.endsWith('.sql'))
        .sort()
        .map(fileName => {
            const query = readFileSync(folder + sep + fileName).toString();
            return { fileName, query };
        });
    return migrations;
};
