import nodemon from 'nodemon';
import { replaceTscAliasPaths } from 'tsc-alias';
import { TscWatchClient } from 'tsc-watch/client.js';

/**
 * This script is used to run the server in development mode.
 * - TscWatchClient is used to compile the server in watch mode.
 * - replaceTscAliasPaths is used to replace the paths in the compiled files. (api "@" alias are replaced)
 * - nodemon is used to restart the server when a file changes (with debug on port :9229).
 */

const nodemonCfg = '--inspect=0.0.0.0:9229 dist/src/index.js';

const watch = new TscWatchClient();

watch.on('started', () => void 0);

watch.on('first_success', () => {
    replaceTscAliasPaths();
    nodemon(nodemonCfg);
});

watch.on('success', () => replaceTscAliasPaths());
watch.on('compile_errors', () => {});
watch.start('--project', '.');
