import type { UpdateUserPayload } from '@src/services';

export interface PUTUsersRequest {
    Body: {
        password: string;
        update_user?: UpdateUserPayload;
    };
}

export interface DELETEUsersRequest {
    Params: {
        id: number;
    };
}
