import type GlobalServerError from './ServerError';

declare global {
    /* eslint-disable-next-line no-var */
    var ServerError: typeof GlobalServerError;
}

export const registerServerError = () => (global.ServerError = ServerError);
