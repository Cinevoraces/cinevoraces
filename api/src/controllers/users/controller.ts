import { EErrorMessages, EMimeType, EResponseMessages, ESchemasIds } from '@src/types';
import { hashString } from '@src/utils';
import { type FastifyInstance, type FastifyReply as Reply, type FastifyRequest as Request } from 'fastify';
import type { DELETEUsersRequest, PUTUsersRequest } from './types';

export default async (fastify: FastifyInstance) => {
    fastify.route({
        method: 'GET',
        url: '/users',
        schema: fastify.getSchema(ESchemasIds.GETPublicUsers),
        handler: async (request: Request, reply: Reply) => {
            const { _errorService } = fastify;
            const { userService } = fastify.services;
            const { rowCount, rows } = await userService.getUsers(request.query);

            if (!rowCount) _errorService.send(EErrorMessages.NOT_FOUND, 404);
            reply.code(200).send(rows);
        },
    });

    fastify.route({
        method: 'GET',
        url: '/users/me',
        schema: fastify.getSchema(ESchemasIds.GETPrivateUsers),
        onRequest: [fastify.verifyAccessToken],
        handler: async (request: Request, reply: Reply) => {
            const { _errorService } = fastify;
            const { userService } = fastify.services;
            const { rowCount, rows } = await userService.getUsers(request.query, request.user.id);

            if (!rowCount) _errorService.send(EErrorMessages.NOT_FOUND, 404);
            reply.code(200).send(rows);
        },
    });

    fastify.route({
        method: 'PUT',
        url: '/users',
        schema: fastify.getSchema(ESchemasIds.PUTUsers),
        onRequest: [fastify.verifyAccessToken],
        preValidation: [fastify.verifyPassword],
        handler: async (request: Request<PUTUsersRequest>, reply: Reply) => {
            const { userService } = fastify.services;
            const { _errorService, _authService } = fastify;
            const { update_user } = request.body;

            if (update_user.password) {
                // Test and Hash new password
                if (!update_user.password.match(/^(?=.*[A-Z])(?=.*[!#$%*+=?|-])(?=.*\d)[!#$%*+=?|\-A-Za-z\d]{12,}$/))
                    _errorService.send(EErrorMessages.INVALID_PASSWORD_FORMAT, 422);

                update_user.password = await hashString(update_user.password);
            }
            // Update user
            await userService.updateUser(request.user.id, update_user);

            reply.code(201).send({ message: EResponseMessages.UPDATE_USER_SUCCESS });
        },
    });

    fastify.route({
        method: 'PUT',
        url: '/users/avatar',
        schema: fastify.getSchema(ESchemasIds.PUTUsersAvatar),
        onRequest: [fastify.verifyAccessToken],
        handler: async (request: Request, reply: Reply) => {
            const { _errorService, _fileService } = fastify;
            const { id } = request.user;
            const avatar = await request.file();

            // File validation checks
            const allowedMimeTypes = [EMimeType.PNG, EMimeType.GIF, EMimeType.JPEG, EMimeType.JPG, EMimeType.WEBP];
            if (!avatar) _errorService.send(EErrorMessages.INVALID_FILE, 400);
            if (!allowedMimeTypes.includes(avatar.mimetype as EMimeType))
                _errorService.send(EErrorMessages.INVALID_FILE_MIMETYPE, 415);
            avatar.file.on('limit', () => {
                _errorService.send(EErrorMessages.INVALID_FILE_SIZE, 413);
            });

            try {
                await _fileService.UploadAvatar(id, avatar);
                reply.code(201).send({ message: EResponseMessages.UPDATE_USER_PIC_SUCCESS });
            } catch (err) {
                _errorService.send(err.message, 500);
            }
        },
    });

    fastify.route({
        method: 'DELETE',
        url: '/admin/users/:id',
        schema: fastify.getSchema(ESchemasIds.DELETEUsersAsAdmin),
        onRequest: [fastify.isAdmin],
        preValidation: [fastify.verifyPassword],
        handler: async function (request: Request<DELETEUsersRequest>, reply: Reply) {
            const { userService } = this.services;
            const { id } = request.params;

            // Delete user
            await userService.deleteUser(id);
            reply.code(200).send({ message: EResponseMessages.DELETE_USER_SUCCESS });
        },
    });
};
