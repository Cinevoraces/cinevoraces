import type { FastifyInstance } from 'fastify';
import {
  getUsersSchema,
  putUserSchema,
  adminDeleteUserByIdSchema,
} from './users.schema';
import {
  handleGetUsers,
  handlePutUser,
  handleAdminDeleteUserById,
  handlePutUserAvatar,
} from './users.handler';

export const users = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'GET',
    url: '/users',
    schema: getUsersSchema,
    handler: handleGetUsers,
  });

  fastify.route({
    method: 'PUT',
    url: '/users',
    schema: putUserSchema,
    handler: handlePutUser,
    onRequest: [fastify.verifyAccessToken],
    preValidation: [fastify.verifyPassword],
  });

  fastify.route({
    method: 'PUT',
    url: '/users/avatar',
    // schema: putUserSchema,
    handler: handlePutUserAvatar,
    onRequest: [fastify.verifyAccessToken],
    preValidation: [fastify.uploadUserAvatar],
  });

  fastify.route({
    method: 'DELETE',
    url: '/admin/users/:id',
    schema: adminDeleteUserByIdSchema,
    handler: handleAdminDeleteUserById,
    onRequest: [fastify.isAdmin],
    preValidation: [fastify.verifyPassword],
  });
};
