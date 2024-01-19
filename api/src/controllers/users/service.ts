import type { MultipartFile } from '@fastify/multipart';
import { HTTPClient } from '@src/classes';
import { EDocType, EMimeType } from '@src/types';
import { cloudinaryDelete, cloudinaryUpload, deleteFile, getFolderPath, saveFile } from '@src/utils';
import type { PoolClient } from 'pg';
import DatabaseService from '../../services/databaseService';
import type { DeleteUserFn, GetUsersFn, UpdateUserFn, UploadAvatarFn, ValidateAvatarFn } from './types';

export default async (postgres: PoolClient) => {
    const dbService = new DatabaseService(postgres);

    /**
     * Get users using query parameters.
     * - Set *id* to get "me" as user.
     */
    const getUsers: GetUsersFn = async (queryString, id) => {
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
            SELECT = dbService.reduceSelect(select as Record<string, unknown>, enums.select);
        }
        if (where) {
            WHERE = dbService.reduceWhere(where as Record<string, unknown>, 'AND', enums.where);
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

        return await dbService.requestDatabase({
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
     * Update one user.
     */
    const updateUser: UpdateUserFn = async (id, set) => {
        const enumerator = ['pseudo', 'mail', 'password'];
        const SET = dbService.reduceWhere(set as Record<string, unknown>, ',', enumerator, 1);
        await dbService.requestDatabase({
            text: ` UPDATE "user"
              SET ${SET.query}
              WHERE id=$1;`,
            values: [id, ...SET.values],
        });
    };

    /**
     * Delete one user.
     */
    const deleteUser: DeleteUserFn = async id => {
        await dbService.requestDatabase({
            text: ' DELETE FROM "user" WHERE id=$1;',
            values: [id],
        });
    };

    /**
     * Validate avatar file on upload.
     */
    const validateAvatar: ValidateAvatarFn = (avatar: MultipartFile) => {
        const allowedMimeTypes = [EMimeType.PNG, EMimeType.GIF, EMimeType.JPEG, EMimeType.JPG, EMimeType.WEBP];

        if (!avatar) {
            // issues/168 - FIXME: This should not return the final error message
            throw new ServerError(400, 'INVALID_FILE', 'Le fichier est invalide.');
        }
        if (!allowedMimeTypes.includes(avatar.mimetype as EMimeType)) {
            // issues/168 - FIXME: This should not return the final error message
            throw new ServerError(415, 'INVALID_FILE_MIMETYPE', "Le format de ce fichier n'est pas pris en charge.");
        }
        avatar.file.on('limit', () => {
            // issues/168 - FIXME: This should not return the final error message
            throw new ServerError(413, 'INVALID_FILE_SIZE', 'Le fichier est trop volumineux.');
        });
    };

    /**
     * Use cloudinary to resize avatar then stores it on disk.
     */
    const uploadAvatar: UploadAvatarFn = async (userId, avatar) => {
        const public_id = crypto.randomUUID();
        const tempFilePath = `${getFolderPath('temp')}/${public_id}.${avatar.mimetype.split('/')[1]}`;
        await saveFile(tempFilePath, avatar.file);

        const { url: cloudinaryUrl } = await cloudinaryUpload(tempFilePath, public_id);

        const filename = `${EDocType.AVATAR}${userId}`;
        const httpClient = new HTTPClient();
        const { contentType } = await httpClient.downloadFile(cloudinaryUrl, { filename, destination: 'public' });

        await dbService.requestDatabase({
            text: ' SELECT add_or_update_avatar($1, $2, $3);',
            values: [userId, filename, contentType],
        });

        await deleteFile(tempFilePath);
        await cloudinaryDelete(public_id);
    };

    return {
        getUsers,
        updateUser,
        deleteUser,
        validateAvatar,
        uploadAvatar,
    };
};
