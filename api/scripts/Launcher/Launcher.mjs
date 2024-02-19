import jest from 'jest';
import { TscWatchClient } from 'tsc-watch/client.js';

export default class Launcher {
    compiler = new TscWatchClient();

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
        jest.run(['./tests/unit/*', '--watchAll']);
    }
}
