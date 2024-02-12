export interface UpdateUserPayload {
    pseudo?: string;
    mail?: string;
    password?: string;
}

export interface CreateUserPayload {
    pseudo: string;
    mail: string;
    password: string;
}

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
