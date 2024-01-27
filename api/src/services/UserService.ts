import type { MultipartFile } from '@fastify/multipart';
import { HTTPClient } from '@src/classes';
import type { UpdateUserPayload } from '@src/controllers/users/types';
import { EDocType, EMimeType, type ERoles, type GetUsers, type QueryString, type User } from '@src/types';
import { cloudinaryDelete, cloudinaryUpload, deleteFile, getFolderPath, saveFile } from '@src/utils';
import type { QueryResult } from 'pg';
import Service from './Service';

type CreateUserFn = (values: Record<'pseudo' | 'mail' | 'password', string>) => Promise<void>;
type DeleteUserFn = (id: number) => Promise<QueryResult>;
type GetPrivateUserFn = (
    value: { id: number } | { pseudo: string } | { mail: string },
) => Promise<{ id: number; pseudo: string; mail: string; role: ERoles }>;
type GetUsersFn = (
    queryString: QueryString<GetUsers.Select, GetUsers.Where>,
    id?: number,
) => Promise<{ rowCount: number; rows: Array<User> }>;
type UpdateUserFn = (id: number, payload: UpdateUserPayload) => Promise<void>;
type UploadAvatarFn = (userId: number, avatar: MultipartFile) => Promise<void>;
type ValidateAvatarFn = (avatar: MultipartFile) => void;

export default class UserService extends Service {
    /**
     * Get users using query parameters.
     * - Set *id* to get "me" as user.
     */
    getUsers: GetUsersFn = async (queryString, id) => {
        const { select, where, limit, sort } = queryString;
        const isPrivate = id !== undefined;

        const enums = {
            where: isPrivate ? [] : ['id', 'pseudo', 'mail', 'role'],
            select: ['propositions', 'reviews', 'metrics', 'movies'],
        };
        let values = [] as Array<unknown>,
            SELECT: string = undefined,
            WHERE = { query: '', count: 0, values: [] as Array<unknown> },
            ORDERBY = '',
            LIMIT = '';

        if (select) {
            SELECT = this.reduceSelect(select as Record<string, unknown>, enums.select);
        }
        if (where) {
            WHERE = this.reduceWhere(where as Record<string, unknown>, 'AND', enums.where);
            values = WHERE.values as Array<unknown>;
        }
        if (isPrivate) {
            WHERE = { query: 'id=$1', count: 1, values: [id] as Array<unknown> };
            values = WHERE.values;
        }
        if (sort === 'asc' || sort === 'desc') {
            ORDERBY = `ORDER BY id ${sort}`;
        }
        if (typeof limit === 'number' && limit > 0) {
            LIMIT = `LIMIT ${limit}`;
        }

        return await this.postgres.query({
            text: ` SELECT id, pseudo, ${isPrivate ? 'mail, ' : ''}role, created_at, updated_at
              ${SELECT ? `,${SELECT}` : ''}
              FROM userview
              ${WHERE?.count ? `WHERE ${WHERE.query}` : ''}
              ${ORDERBY}
              ${LIMIT};`,
            values,
        });
    };

    /**
     * Get token construction data of one user using id or pseudo.
     */
    getPrivateUser: GetPrivateUserFn = async value => {
        const column: string = Object.keys(value)[0];
        const { rows } = await this.postgres.query({
            text: ` 
                    SELECT id, pseudo, mail, password, role, document_group_id
                    FROM "user"
                    WHERE ${Object.keys(value)[0]} = $1;`,
            values: [value[column as keyof typeof value]],
        });
        return rows[0];
    };

    /**
     * Create a new user.
     */
    createUser: CreateUserFn = async values => {
        const { pseudo, mail, password } = values;
        await this.postgres.query({
            text: 'INSERT INTO "user" (pseudo, mail, password) VALUES ($1, $2, $3);',
            values: [pseudo, mail, password],
        });
    };

    /**
     * Update one user.
     */
    updateUser: UpdateUserFn = async (id, set) => {
        const enumerator = ['pseudo', 'mail', 'password'];
        const SET = this.reduceWhere(set as Record<string, unknown>, ',', enumerator, 1);
        await this.postgres.query({
            text: ` UPDATE "user"
              SET ${SET.query}
              WHERE id=$1;`,
            values: [id, ...SET.values],
        });
    };

    /**
     * Delete one user.
     */
    deleteUser: DeleteUserFn = async id =>
        await this.postgres.query({
            text: ' DELETE FROM "user" WHERE id=$1;',
            values: [id],
        });

    /**
     * Validate avatar file on upload.
     */
    validateAvatar: ValidateAvatarFn = (avatar: MultipartFile) => {
        const allowedMimeTypes = [EMimeType.PNG, EMimeType.GIF, EMimeType.JPEG, EMimeType.JPG, EMimeType.WEBP];

        if (!avatar) {
            throw new ServerError(400, 'INVALID_FILE', 'Le fichier est invalide.'); // issues/168
        }
        if (!allowedMimeTypes.includes(avatar.mimetype as EMimeType)) {
            throw new ServerError(415, 'INVALID_FILE_MIMETYPE', "Le format de ce fichier n'est pas pris en charge."); // issues/168
        }
        avatar.file.on('limit', () => {
            throw new ServerError(413, 'INVALID_FILE_SIZE', 'Le fichier est trop volumineux.'); // issues/168
        });
    };

    /**
     * Use cloudinary to resize avatar then stores it on disk.
     */
    uploadAvatar: UploadAvatarFn = async (userId, avatar) => {
        const public_id = crypto.randomUUID();
        const tempFilePath = `${getFolderPath('temp')}/${public_id}.${avatar.mimetype.split('/')[1]}`;
        await saveFile(tempFilePath, avatar.file);

        const { url: cloudinaryUrl } = await cloudinaryUpload(tempFilePath, public_id);

        const filename = `${EDocType.AVATAR}${userId}`;
        const httpClient = new HTTPClient();
        const { contentType } = await httpClient.downloadFile(cloudinaryUrl, { filename, destination: 'public' });

        console.log('contentType', contentType);
        console.log('filename', filename);

        await this.postgres.query({
            text: ' SELECT add_or_update_avatar($1, $2, $3);',
            values: [userId, filename, contentType],
        });

        await deleteFile(tempFilePath);
        await cloudinaryDelete(public_id);
    };
}
