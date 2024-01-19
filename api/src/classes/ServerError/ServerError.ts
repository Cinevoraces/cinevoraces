type ServerErrorStatus = 'NOT_FOUND' | 'INTERNAL_SERVER_ERROR' | 'BAD_REQUEST' | 'UNAUTHORIZED' | 'FORBIDDEN';

type ErrorCodes =
    | 'DUPLICATE_PSEUDO'
    | 'DUPLICATE_MAIL'
    | 'INVALID_DOC_TYPE'
    | 'INVALID_FILE'
    | 'INVALID_FILE_MIMETYPE'
    | 'INVALID_FILE_SIZE'
    | 'INVALID_CREDENTIALS'
    | 'INVALID_PASSWORD_FORMAT'
    | 'INVALID_TOKEN'
    | 'METRICS_COULD_NOT_GET'
    | 'TOKEN_USER_NOT_FOUND'
    | 'NOT_FOUND'
    | 'INTERNAL_SERVER_ERROR'
    | 'BAD_REQUEST'
    | 'UNAUTHORIZED'
    | 'FORBIDDEN';

export default class ServerError extends Error {
    public status: number;
    public code: string;

    constructor(status: number | ServerErrorStatus, code?: ErrorCodes | null, message?: string | null) {
        super(message);
        this.name = 'ServerError';
        this.status = typeof status === 'number' ? status : this.stringStatusToNumber(status);
        this.code = code ? code : this.resolveCode(status);
    }

    private stringStatusToNumber(status: ServerErrorStatus): number {
        switch (status) {
            case 'NOT_FOUND':
                return 404;
            case 'INTERNAL_SERVER_ERROR':
                return 500;
            case 'BAD_REQUEST':
                return 400;
            case 'UNAUTHORIZED':
                return 401;
            case 'FORBIDDEN':
                return 403;
            default: {
                const resolved = Number(status);
                if (isNaN(resolved)) return 500;
                if (resolved < 400 || resolved > 599) return 500;
                return resolved;
            }
        }
    }

    private resolveCode(status: number | ServerErrorStatus): string {
        if (typeof status === 'number') {
            switch (status) {
                case 404:
                    return 'NOT_FOUND';
                case 500:
                    return 'INTERNAL_SERVER_ERROR';
                case 400:
                    return 'BAD_REQUEST';
                case 401:
                    return 'UNAUTHORIZED';
                case 403:
                    return 'FORBIDDEN';
                default:
                    return 'INTERNAL_SERVER_ERROR';
            }
        }
        return status;
    }
}
