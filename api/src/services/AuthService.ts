import type { User } from '@src/types';
import { ERoles } from '@src/types';
import { compareStrings } from '@src/utils';
import { type FastifyReply as Reply, type FastifyRequest as Request } from 'fastify';
import Service from './Service';

type CheckRegistrationPayloadFn = (payload: { mail: string; pseudo: string; password: string }) => Promise<void>;

export default class AuthService extends Service {
    /**
     * Check access token then populate request.user with decoded informations.
     */
    public verifyAccessToken = async (request: Request) => {
        try {
            await request.jwtVerify();
            return request.user;
        } catch {
            throw new ServerError(401);
        }
    };

    /**
     * Check access token then populate request.user with decoded informations or do nothing.
     */
    public verifyAccessTokenOptionnal = async (request: Request) => {
        if (request.headers.authorization) return await this.verifyAccessToken(request);
    };

    /**
     * Check refresh token then populate request.user with decoded informations.
     */
    public verifyRefreshToken = async (request: Request, reply: Reply) => {
        try {
            await request.jwtVerify({ onlyCookie: true });
            return request.user;
        } catch {
            reply.code(401).send({ message: 'Session expirée. Veuillez vous reconnecter.' });
        }
    };

    /**
     * Check password.
     */
    public verifyPassword = async (userId: number, password: string) => {
        const { rows } = await this.postgres.query({
            text: 'SELECT password FROM "user" WHERE id = $1;',
            values: [userId],
        });
        return await compareStrings(password, rows[0].password);
    };

    /**
     * Check password or throw.
     */
    public verifyPasswordOrThrow = async (userId: number, password: string) => {
        const match = await this.verifyPassword(userId, password);
        if (!match) throw new ServerError(401, 'INVALID_CREDENTIALS', 'Identifiants incorrects.'); // issues/168
    };

    /**
     * Check if user is admin.
     */
    public isAdmin = async (request: Request) => {
        await request.jwtVerify();
        return request.user.role === ERoles.ADMIN;
    };

    /**
     * Check if user is admin or throw.
     */
    public isAdminOrThrow = async (request: Request) => {
        const isAdmin = await this.isAdmin(request);
        if (!isAdmin) throw new ServerError(403);
    };

    /**
     * Check registration payload and throw if invalid.
     */
    public checkRegistrationPayload: CheckRegistrationPayloadFn = async ({ mail, pseudo, password }) => {
        const { rowCount, rows } = await this.postgres.query<User>({
            text: 'SELECT pseudo, mail FROM "user" WHERE pseudo = $1 OR mail = $2;',
            values: [pseudo, mail],
        });

        if (!pseudo.is('valid-pseudo')) {
            throw new ServerError(409, 'DUPLICATE_PSEUDO', 'Ce pseudo est réservé ou interdit'); // issues/168
        }
        if (rowCount && mail === rows[0].mail) {
            throw new ServerError(409, 'DUPLICATE_MAIL', 'Cette adresse mail est déjà associée à un compte'); // issues/168
        }
        if (rowCount && pseudo === rows[0].pseudo) {
            throw new ServerError(409, 'DUPLICATE_PSEUDO', 'Ce pseudo est réservé ou interdit'); // issues/168
        }
        if (!password.is('valid-password')) {
            throw new ServerError(400, 'INVALID_PASSWORD_FORMAT', 'Le format du mot de passe est invalide.');
        }
    };
}
