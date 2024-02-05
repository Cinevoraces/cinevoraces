import nodemon from 'nodemon';
import { replaceTscAliasPaths } from 'tsc-alias';
import { TscWatchClient } from 'tsc-watch/client.js';
import { fileURLToPath } from 'url';

/**
 * This script is used to run the server in development mode.
 * - TscWatchClient is used to compile the server in watch mode.
 * - replaceTscAliasPaths is used to replace the paths in the compiled files. (api "@" alias are replaced)
 * - nodemon is used to restart the server when a file changes (with debug on port :9229).
 */

const rootpath = fileURLToPath(import.meta.url).split('/scripts')[0];
process.chdir(rootpath);

const nodemonCfg = {
    script: rootpath + '/dist/src/index.js',
    exec: 'node --inspect=0.0.0.0:9229',
};

const watch = new TscWatchClient();

watch.on('started', () => void 0);

watch.on('first_success', () => {
    replaceTscAliasPaths();
    nodemon(nodemonCfg);
});

watch.on('success', () => replaceTscAliasPaths());
watch.on('compile_errors', () => {});
watch.start('--project', '.');
