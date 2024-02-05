import { rateLimit } from '@src/config';
import { AuthService, UserService } from '@src/services';
import { hashString } from '@src/utils';
import { type FastifyInstance, type FastifyReply as Reply, type FastifyRequest as Request } from 'fastify';
import plugin from 'fastify-plugin';
import schemas from './schemas';
import type { POSTLoginBody, POSTRegisterBody } from './types';

const aTokenOptions = { expiresIn: 600 };
const rTokenOptions = { expiresIn: '1d' };

export default plugin(async (fastify: FastifyInstance) => {
    const authService = new AuthService(fastify.postgres);
    const userService = new UserService(fastify.postgres);
    fastify.addSchemas(schemas);

    fastify.route({
        method: 'POST',
        url: '/auth/register',
        schema: fastify.getSchema('API:POST/auth/register'),
        handler: async (request: Request<POSTRegisterBody>, reply: Reply) => {
            const { body } = request;
            await authService.checkRegistrationPayload(body);
            body.password = await hashString(body.password);
            await userService.createUser(body);
            reply.code(200).send({ message: 'Compte utilisateur créé avec succès.' });
        },
    });

    fastify.route({
        method: 'POST',
        url: '/auth/login',
        preHandler: fastify.rateLimit(rateLimit.loginAttempts),
        schema: fastify.getSchema('API:POST/auth/login'),
        handler: async (request: Request<POSTLoginBody>, reply: Reply) => {
            const { mail, pseudo, password } = request.body;

            const privateUser = await userService.getPrivateUser(pseudo ? { pseudo } : { mail });
            if (!privateUser) {
                throw new ServerError(401, 'INVALID_CREDENTIALS', 'Identifiants incorrects.'); // issues/168
            }

            await authService.verifyPasswordOrThrow(privateUser.id, password);

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
                    message: `Bienvenue ${privateUser.pseudo} !`,
                });
        },
    });

    fastify.route({
        method: 'GET',
        url: '/auth/refresh',
        schema: fastify.getSchema('API:GET/auth/refresh'),
        handler: async (request: Request, reply: Reply) => {
            const { id } = await authService.verifyRefreshToken(request, reply);
            const user = await userService.getPrivateUser({ id });

            if (!user) throw new ServerError(401, 'INVALID_TOKEN');

            const tokensContent = {
                id: user.id,
                pseudo: user.pseudo,
                role: user.role,
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
                    user: user,
                    token: accessToken,
                });
        },
    });
});
