import { readFileSync } from 'fs';

/**
 * Set environment variables from a .env file
 * @param {string} envPath - The path to the .env file
 * @param {boolean} [retry] - If the function should retry to find the .env file in the parent directory
 */
export const setEnv = (envPath, retry) => {
    const eof = process.platform === 'win32' ? '\r\n' : '\n';
    try {
        const env = readFileSync(envPath, 'utf8');
        for (const line of env.split(eof)) {
            if (line) {
                const [key, value] = line.split('=');
                process.env[key] = value;
            }
        }
    } catch (err) {
        if (retry) throw err;
        setEnv(envPath.replace('/.env', '/../.env'), true);
    }
};
