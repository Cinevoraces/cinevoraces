import { AuthService, UserService } from '@src/services';
import { hashString } from '@src/utils';
import { type FastifyReply as Reply, type FastifyRequest as Request } from 'fastify';
import plugin from 'fastify-plugin';
import schemas from './schemas';
import type { PUTUsersRequest } from './types';

export default plugin(async fastify => {
    const authService = new AuthService(fastify.postgres);
    const userService = new UserService(fastify.postgres);
    fastify.addSchemas(schemas);

    fastify.route({
        method: 'GET',
        url: '/users',
        schema: fastify.getSchema('API:GET/users'),
        handler: async (request: Request, reply: Reply) => {
            const { rowCount, rows } = await userService.getUsers(request.query);
            if (!rowCount) {
                throw new ServerError(404, 'NOT_FOUND', 'Aucun résultat.'); // issues/168
            }
            reply.code(200).send(rows);
        },
    });

    fastify.route({
        method: 'GET',
        url: '/users/me',
        schema: fastify.getSchema('API:GET/users/me'),
        handler: async (request: Request, reply: Reply) => {
            await authService.verifyAccessToken(request);
            const { rowCount, rows } = await userService.getUsers(request.query, request.user.id);
            if (!rowCount) throw new ServerError(404, 'TOKEN_USER_NOT_FOUND', 'Token user not found');
            reply.code(200).send(rows);
        },
    });

    fastify.route({
        method: 'PUT',
        url: '/users',
        schema: fastify.getSchema('API:PUT/users'),
        handler: async (request: Request<PUTUsersRequest>, reply: Reply) => {
            await authService.verifyAccessToken(request);
            await authService.verifyPasswordOrThrow(request.user.id, request.body.password);
            const { update_user } = request.body;

            if (update_user.password) {
                if (!update_user.password.is('valid-password')) {
                    throw new ServerError(400, 'INVALID_PASSWORD_FORMAT', 'Le format du mot de passe est invalide.'); // issues/168
                }

                update_user.password = await hashString(update_user.password);
            }

            await userService.updateUser(request.user.id, update_user);

            reply.code(201).send({ message: 'Votre profil a bien été mis à jour.' }); // issues/168
        },
    });

    fastify.route({
        method: 'PUT',
        url: '/users/avatar',
        schema: fastify.getSchema('API:PUT/users/avatar'),
        handler: async (request: Request, reply: Reply) => {
            const { id } = await authService.verifyAccessToken(request);
            const avatar = await request.file();
            userService.validateAvatar(avatar);
            await userService.uploadAvatar(id, avatar);
            reply.code(201).send({ message: 'Votre avatar a bien été mis à jour.' }); // issues/168
        },
    });
});
