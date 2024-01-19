import { hashString } from '@src/utils';
import { type FastifyReply as Reply, type FastifyRequest as Request } from 'fastify';
import plugin from 'fastify-plugin';
import schemas from './schemas';
import createService from './service';
import type { PUTUsersRequest } from './types';

export default plugin(async fastify => {
    const { getUsers, updateUser, uploadAvatar, validateAvatar } = await createService(fastify.postgres);
    fastify.addSchemas(schemas);

    fastify.route({
        method: 'GET',
        url: '/users',
        schema: fastify.getSchema('API:GET/users'),
        handler: async (request: Request, reply: Reply) => {
            const { rowCount, rows } = await getUsers(request.query);
            if (!rowCount)
                // issues/168 - FIXME: This should not return the final error message
                throw new ServerError(404, 'NOT_FOUND', 'Aucun résultat.');
            reply.code(200).send(rows);
        },
    });

    fastify.route({
        method: 'GET',
        url: '/users/me',
        schema: fastify.getSchema('API:GET/users/me'),
        onRequest: [fastify.verifyAccessToken],
        handler: async (request: Request, reply: Reply) => {
            const { rowCount, rows } = await getUsers(request.query, request.user.id);
            if (!rowCount) throw new ServerError(404, 'TOKEN_USER_NOT_FOUND', 'Token user not found');
            reply.code(200).send(rows);
        },
    });

    fastify.route({
        method: 'PUT',
        url: '/users',
        schema: fastify.getSchema('API:PUT/users'),
        onRequest: [fastify.verifyAccessToken],
        preValidation: [fastify.verifyPassword],
        handler: async (request: Request<PUTUsersRequest>, reply: Reply) => {
            const { update_user } = request.body;

            if (update_user.password) {
                // Test and Hash new password
                if (!update_user.password.match(/^(?=.*[A-Z])(?=.*[!#$%*+=?|-])(?=.*\d)[!#$%*+=?|\-A-Za-z\d]{12,}$/))
                    // issues/168 - FIXME: This should not return the final error message
                    throw new ServerError(400, 'INVALID_PASSWORD_FORMAT', 'Le format du mot de passe est invalide.');

                update_user.password = await hashString(update_user.password);
            }

            await updateUser(request.user.id, update_user);

            // issues/168 - FIXME: This should not return the final message
            reply.code(201).send({ message: 'Votre profil a bien été mis à jour.' });
        },
    });

    fastify.route({
        method: 'PUT',
        url: '/users/avatar',
        schema: fastify.getSchema('API:PUT/users/avatar'),
        onRequest: [fastify.verifyAccessToken],
        handler: async (request: Request, reply: Reply) => {
            const { id } = request.user;
            const avatar = await request.file();
            validateAvatar(avatar);
            await uploadAvatar(id, avatar);
            // issues/168 - FIXME: This should not return the final message
            reply.code(201).send({ message: 'Votre avatar a bien été mis à jour.' });
        },
    });
});
