import type { MultipartFile } from '@fastify/multipart';
import { HTTPClient, Query, UserRepository } from '@src/classes';
import type { CreateUserPayload, UpdateUserPayload } from '@src/controllers/users/types';
import type { BaseQuery } from '@src/types';
import { EDocType, EMimeType, type ERoles, type User } from '@src/types';
import { cloudinaryDelete, cloudinaryUpload, deleteFile, getFolderPath, hashString, saveFile } from '@src/utils';
import type { PoolClient } from 'pg';
import Service from './Service';

type CreateUserFn = (payload: CreateUserPayload) => Promise<void>;
type DeleteUserFn = (id: number) => Promise<void>;
type GetPrivateUserFn = (
    value: { id: number } | { pseudo: string } | { mail: string },
) => Promise<{ id: number; pseudo: string; mail: string; role: ERoles }>;
type GetUsersFn = (qs: BaseQuery, id?: number) => Promise<Array<User>>;
type UpdateUserFn = (id: number, payload: UpdateUserPayload) => Promise<void>;
type UploadAvatarFn = (userId: number, avatar: MultipartFile) => Promise<void>;
type ValidateAvatarFn = (avatar: MultipartFile) => void;

export default class UserService extends Service {
    userRepo: UserRepository;

    constructor(postgres: PoolClient) {
        super(postgres);
        this.userRepo = new UserRepository(postgres);
    }

    /**
     * Get users using query parameters.
     * - Set *id* to get "me" as user.
     */
    getUsers: GetUsersFn = async (queryString, id) => {
        const isPrivate = id !== undefined;

        const query = new Query({
            ...queryString,
            select: {
                ...queryString.select,
                id: true,
                pseudo: true,
                role: true,
                created_at: true,
                updated_at: true,
                mail: isPrivate,
            },
            where: {
                ...queryString.where,
                ...(isPrivate ? { id } : {}),
            },
        });

        return await this.userRepo.getMany(query);
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
        let { pseudo, mail, password } = values;
        password = await hashString(password);
        await this.userRepo.create({ pseudo, mail, password });
    };

    /**
     * Update one user.
     */
    updateUser: UpdateUserFn = async (id, { password, ...payload }) => {
        if (password) {
            if (!password.is('valid-password'))
                throw new ServerError(400, 'INVALID_PASSWORD_FORMAT', 'Le format du mot de passe est invalide.'); // issues/168

            password = await hashString(password);
        }

        const query = new Query({
            where: { id },
            set: {
                ...payload,
                ...(password ? { password } : {}),
            },
        });
        await this.userRepo.update(query);
    };

    /**
     * Delete one user.
     */
    deleteUser: DeleteUserFn = async id => await this.userRepo.delete(id);

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
