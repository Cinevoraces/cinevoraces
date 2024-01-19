import { ESchemasIds } from '@src/types';
import { hashString } from '@src/utils';
import { type FastifyInstance, type FastifyReply as Reply, type FastifyRequest as Request } from 'fastify';

const aTokenOptions = { expiresIn: 600 };
const rTokenOptions = { expiresIn: '1d' };

/**
 * @description Auth API.
 * @prefix /
 */
export default async (fastify: FastifyInstance) => {
    /**
     * @description Register a new user.
     * @route POST /register
     */
    fastify.route({
        method: 'POST',
        url: '/register',
        schema: fastify.getSchema(ESchemasIds.POSTRegister),
        handler: async function (
            request: Request<{ Body: { pseudo: string; mail: string; password: string } }>,
            reply: Reply,
        ) {
            const { _authService } = this;
            const { body } = request;

            // 'moi' endpoint is used for private user pages
            const forbiddenPseudos = ['moi'];
            if (forbiddenPseudos.includes(body.pseudo)) {
                // issues/168 - FIXME: This should not return the final error message
                throw new ServerError(409, 'DUPLICATE_PSEUDO', 'Ce pseudo est réservé ou interdit');
            }
            const user = await _authService.getUserByPseudoOrMail(body.pseudo, body.mail);
            if (user && body.mail === user.mail) {
                // issues/168 - FIXME: This should not return the final error message
                throw new ServerError(409, 'DUPLICATE_MAIL', 'Cette adresse mail est déjà associée à un compte');
            }
            if (user && body.pseudo === user.pseudo) {
                // issues/168 - FIXME: This should not return the final error message
                throw new ServerError(409, 'DUPLICATE_PSEUDO', 'Ce pseudo est réservé ou interdit');
            }
            // Test and Hash password
            if (!body.password.match(/^(?=.*[A-Z])(?=.*[!#$%*+=?|-])(?=.*\d)[!#$%*+=?|\-A-Za-z\d]{12,}$/)) {
                throw new ServerError(400, 'INVALID_PASSWORD_FORMAT', 'Le format du mot de passe est invalide.');
            }

            body.password = await hashString(body.password);
            await _authService.createUser(body);
            // issues/168 - FIXME: This should not return the final message
            reply.code(200).send({ message: 'Compte utilisateur créé avec succès.' });
        },
    });

    /**
     * @description Log a user.
     * @route POST /login
     */
    fastify.route({
        method: 'POST',
        url: '/login',
        schema: fastify.getSchema(ESchemasIds.POSTLogin),
        handler: async function (
            request: Request<{ Body: { pseudo?: string; mail?: string; password: string } }>,
            reply: Reply,
        ) {
            const { _authService } = this;
            const { mail, pseudo, password } = request.body;

            const privateUser = await _authService.getPrivateUser(pseudo ? { pseudo } : { mail });
            if (!privateUser) {
                // issues/168 - FIXME: This should not return the final error message
                throw new ServerError(401, 'INVALID_CREDENTIALS', 'Identifiants incorrects.');
            }
            const isPasswordCorrect = await _authService.verifyPassword(privateUser.id, password);
            if (!isPasswordCorrect) {
                // issues/168 - FIXME: This should not return the final error message
                throw new ServerError(401, 'INVALID_CREDENTIALS', 'Identifiants incorrects.');
            }

            const tokensContent = {
                id: privateUser.id,
                pseudo: privateUser.pseudo,
                role: privateUser.role,
            };

            const accessToken = await reply.jwtSign(tokensContent, aTokenOptions);
            const refreshToken = await reply.jwtSign(tokensContent, rTokenOptions);

            reply
                .code(200)
                .setCookie('refresh_token', refreshToken, {
                    signed: true,
                    httpOnly: false,
                    secure: true,
                    sameSite: 'strict',
                    expires: Date.tomorrow(),
                })
                .send({
                    user: privateUser,
                    token: accessToken,
                    // issues/168 - FIXME: This should not return the final message
                    message: `Bienvenue ${privateUser.pseudo} !`,
                });
        },
    });

    /**
     * @description Refresh access token.
     * @route GET /refresh
     */
    fastify.route({
        method: 'GET',
        url: '/refresh',
        schema: fastify.getSchema(ESchemasIds.GETRefresh),
        onRequest: [fastify.verifyRefreshToken],
        handler: async function (request: Request, reply: Reply) {
            const { _authService } = this;
            const { user } = request;

            const privateUser = await _authService.getPrivateUser({ id: user.id });

            if (!privateUser) throw new ServerError(401, 'INVALID_TOKEN');

            const tokensContent = {
                id: privateUser.id,
                pseudo: privateUser.pseudo,
                role: privateUser.role,
            };
            const accessToken = await reply.jwtSign(tokensContent, aTokenOptions);
            const refreshToken = await reply.jwtSign(tokensContent, rTokenOptions);

            reply
                .code(200)
                .setCookie('refresh_token', refreshToken, {
                    signed: true,
                    httpOnly: false,
                    secure: true,
                    sameSite: 'strict',
                    expires: Date.tomorrow(),
                })
                .send({
                    user: privateUser,
                    token: accessToken,
                });
        },
    });
};
