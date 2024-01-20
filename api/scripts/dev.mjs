import { exec } from 'child_process';
import { replaceTscAliasPaths } from 'tsc-alias';
import { TscWatchClient } from 'tsc-watch/client.js';

/**
 * This script is used to run the server in development mode.
 * - TscWatchClient is used to compile the server in watch mode.
 * - replaceTscAliasPaths is used to replace the paths in the compiled files. (api "@" alias are replaced)
 * - nodemon is used to restart the server when a file changes (with debug on port :9229).
 */

const watch = new TscWatchClient();

watch.on('started', () => console.log('Starting compilation...'));

watch.on('first_success', () => {
    replaceTscAliasPaths();

    exec('npx nodemon --inspect -r ts-node/register dist/src/index.js', (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
    });
});

watch.on('success', () => replaceTscAliasPaths());

watch.on('compile_errors', () => {});

watch.start('--project', '.');
