import GlobalServerError from './ServerError';

declare global {
    /* eslint-disable-next-line no-var */
    var ServerError: typeof GlobalServerError;
}

/**
 * Register the ServerError class globally.
 */
export const registerServerError = () => (global.ServerError = GlobalServerError);
