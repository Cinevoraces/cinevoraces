import { spawn } from 'child_process';
import { chdir } from 'process';
import { TscWatchClient } from 'tsc-watch/client.js';
import { fileURLToPath } from 'url';
import { getArgs, log, setEnv } from './utils/index.mjs';

export default class Launcher {
    args = {};
    projectRoot = fileURLToPath(import.meta.url).split('/scripts')[0];
    compiler = new TscWatchClient();

    constructor() {
        this.getArguments();
        this.navigateToProjectRoot();
        if (this.args.exportEnv) setEnv(this.projectRoot + '/' + this.args.exportEnv);
    }

    /**
     * Get the arguments from the command line
     */
    getArguments() {
        this.args = getArgs();
    }

    /**
     * Log a message to the console
     * @param {string} text - The message to log
     * @param {string} color - The color of the message
     */
    log(text, color) {
        log(text, color);
    }

    /**
     * Change the current working directory to the project root
     */
    navigateToProjectRoot() {
        chdir(this.projectRoot);
    }

    /**
     * Set compiler callback
     * @param {string} listener - The listener to set
     * @param {function} callback - The callback to set
     * @returns {void}
     */
    setCompilerCallback(listener, callback) {
        this.compiler.on(listener, callback);
    }

    onStarted(callback) {
        this.setCompilerCallback('started', callback);
    }

    onFirstSuccess(callback) {
        this.setCompilerCallback('first_success', callback);
    }

    onSuccess(callback) {
        this.setCompilerCallback('success', callback);
    }

    onCompileErrors(callback) {
        this.setCompilerCallback('compile_errors', callback);
    }

    /**
     * Launch the application
     */
    start() {
        this.compiler.start('--project', '.');
    }

    /**
     * Start unit tests
     */
    startUnitTests() {
        spawn('npx', ['jest', './tests/unit/*', '--watchAll'], { stdio: 'inherit' });
    }
}
