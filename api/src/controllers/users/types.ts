import type { MultipartFile } from '@fastify/multipart';
import type { GetUsers, QueryString, User } from '@src/types';

export type GetUsersFn = (
    queryString: QueryString<GetUsers.Select, GetUsers.Where>,
    id?: number,
) => Promise<{ rowCount: number; rows: Array<User> }>;
export type UpdateUserFn = (id: number, payload: UpdateUserPayload) => Promise<void>;
export type DeleteUserFn = (id: number) => Promise<void>;
export type ValidateAvatarFn = (avatar: MultipartFile) => void;
export type UploadAvatarFn = (userId: number, avatar: MultipartFile) => Promise<void>;

export interface UpdateUserPayload {
    pseudo?: string;
    mail?: string;
    password?: string;
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
