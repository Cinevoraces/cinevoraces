import type {
  FastifyInstance,
  FastifyRequest as Request,
  FastifyReply as Reply,
} from 'fastify';
import { ESchemasIds, EResponseMessages, EErrorMessages, EMimeType } from '../models/enums/_index';

/**
 * @description Users API.
 * @prefix /
 */
export default async (fastify: FastifyInstance) => {

  /**
   * @description Get users according to query. Public datas only.
   * @route GET /users
   */
  fastify.route({
    method: 'GET',
    url: '/users',
    schema: fastify.getSchema(ESchemasIds.GETPublicUsers),
    handler: async function (request: Request, reply: Reply) {
      const { _errorService, _userService } = this;
      const { rowCount, rows } = await _userService.getUsersByQuery(request.query, false);
      if (!rowCount)
        _errorService.send(EErrorMessages.NOT_FOUND, 404);
      reply
        .code(200)
        .send(rows);
    },
  });

  /**
   * @description Get users according to query. Private datas included.
   * @route GET /users/me
   */
  fastify.route({
    method: 'GET',
    url: '/users/me',
    schema: fastify.getSchema(ESchemasIds.GETPrivateUsers),
    onRequest: [fastify.verifyAccessToken],
    handler: async function (request: Request, reply: Reply) {
      const { _errorService, _userService } = this;
      const { rowCount, rows } = await _userService.getUsersByQuery(request.query, false, request.user.id);
      if (!rowCount)
        _errorService.send(EErrorMessages.NOT_FOUND, 404);
      reply
        .code(200)
        .send(rows);
    },
  });
  
  /**
   * @description Put user by token.
   * @route PUT /users
   */
  fastify.route({
    method: 'PUT',
    url: '/users',
    schema: fastify.getSchema(ESchemasIds.PUTUsers),
    onRequest: [fastify.verifyAccessToken],
    preValidation: [fastify.verifyPassword],
    handler: async function (
      request: Request<{ Body: { password: string, update_user?: { pseudo?: string, mail?: string, password?: string } } }>,
      reply: Reply
    ) {
      const { _errorService, _userService, _authService } = this;
      const { update_user } = request.body;

      if (update_user.password) {
        // Test and Hash new password
        if (!update_user.password.match(process.env.PASS_REGEXP))
          _errorService.send(EErrorMessages.INVALID_PASSWORD_FORMAT, 422);

        update_user.password = await _authService.hashString(update_user.password);
      }
      // Update user
      await _userService.updateUser(request.user.id, update_user);

      reply
        .code(201)
        .send({ message: EResponseMessages.UPDATE_USER_SUCCESS });
    },
  });
  
  /**
   * @description Update user avatar.
   * @route PUT /users
   */
  fastify.route({
    method: 'PUT',
    url: '/users/avatar',
    schema: fastify.getSchema(ESchemasIds.PUTUsersAvatar),
    onRequest: [fastify.verifyAccessToken],
    handler: async function (request: Request, reply: Reply) {
      const { _errorService, _fileService } = this;
      const { id } = request.user;
      const avatar = await request.file();
      
      // File validation checks
      const allowedMimeTypes = [
        EMimeType.PNG,
        EMimeType.GIF,
        EMimeType.JPEG,
        EMimeType.JPG,
        EMimeType.WEBP,
      ];
      if (!avatar)
        _errorService.send(EErrorMessages.INVALID_FILE, 400);
      if (!allowedMimeTypes.includes(avatar.mimetype as EMimeType))
        _errorService.send(EErrorMessages.INVALID_FILE_MIMETYPE, 415);
      avatar.file.on('limit', () => {
        _errorService.send(EErrorMessages.INVALID_FILE_SIZE, 413);
      });

      try {
        await _fileService.UploadAvatar(id, avatar);
        reply
          .code(201)
          .send({ message: EResponseMessages.UPDATE_USER_PIC_SUCCESS });

      } catch (err) {
        _errorService.send(err.message, 500);
      }
    },
  });
  
  /**
   * @description Delete user by id.
   * @route DELETE /users
   */
  fastify.route({
    method: 'DELETE',
    url: '/admin/users/:id',
    schema: fastify.getSchema(ESchemasIds.DELETEUsersAsAdmin),
    onRequest: [fastify.isAdmin],
    preValidation: [fastify.verifyPassword],
    handler: async function (request: Request<{ Params: { id: number } }>, reply: Reply) {
      const { _errorService, _userService } = this;
      const { id } = request.params;
      // Check if user exists
      const { rowCount } = await _userService.getUsersByQuery({ where: { id } }, true);
      if (!rowCount)
        _errorService.send(EErrorMessages.NOT_FOUND, 404);
      // Delete user
      await _userService.deleteUser(id);
      reply
        .code(200)
        .send({ message: EResponseMessages.DELETE_USER_SUCCESS });
    },
  });
};
