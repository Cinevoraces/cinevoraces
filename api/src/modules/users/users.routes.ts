import type { FastifyInstance } from 'fastify';
import {
  getUsersSchema,
  putUserByIdSchema,
  deleteUserByIdSchema,
} from './users.schema';
import {
  handleGetUsers,
  // handlePutUserById,
  // handleDeleteUserById,
} from '@modules/users/users.handler';

export const users = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'GET',
    url: '/users',
    schema: getUsersSchema,
    handler: handleGetUsers,
  });

  // fastify.route({
  //   method: 'PUT',
  //   url: '/users',
  //   schema: putUserByIdSchema,
  //   handler: handlePutUserById,
  //   onRequest: [fastify.accessVerify],
  //   preValidation: [fastify.passwordVerify],
  // });

  // fastify.route({
  //   method: 'DELETE',
  //   url: '/users/:id',
  //   schema: deleteUserByIdSchema,
  //   handler: handleDeleteUserById,
  //   onRequest: [fastify.isAdmin],
  //   preValidation: [fastify.passwordVerify],
  // });
};
