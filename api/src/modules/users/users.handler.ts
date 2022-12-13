import type { FastifyReply as Reply, FastifyRequest } from 'fastify';
import type { Query } from '@src/types/Query';
import type { Payload } from '@src/types/Payload';
import { getUsers, updateUser, deleteUser } from './users.datamapper';
import { ApiError, ApiResponse } from '../../types/_index';

type Request = FastifyRequest<{
  Querystring: Query.querystring;
  Params: { id: number };
  Body: Payload.updateUser,
}>;

/**
 * **Get users**
 * @description Get users according to query.
*/
export const handleGetUsers = async (request: Request, reply: Reply) => {
  const { error, pgClient, query } = request;

  const { rows: users, rowCount } = await pgClient.query(
    getUsers(query)
  );
  if (!rowCount)
    error.send(ApiError.NOT_FOUND, 404);

  reply
    .code(200)
    .send(users);
};

/**
 * **Put user**
 * @description Put user by token
*/
export const handlePutUser = async (request: Request, reply: Reply) => {
  const { error, pgClient, user, body } = request;
  const { update_user } = body;
  const { id } = user;

  if (update_user.password) {
    // Test and Hash new password
    if (!update_user.password.match(process.env.PASS_REGEXP))
      error.send(ApiError.INVALID_PASSWORD_FORMAT, 422);
    
    update_user.password = await request.bcryptHash(update_user.password);
  }
    
  // Update user
  await pgClient.query(
    updateUser(id, update_user)
  );

  reply
    .code(204)
    .send({ message: ApiResponse.UPDATE_USER_SUCCESS });
};

/**
 * **Delete one user (ADMIN)**
 * @description Delete one user by id
*/
export const handleAdminDeleteUserById = async (request: Request, reply: Reply) => {
  const { error, pgClient, params } = request;
  const { id } = params;

  // Check if user exists
  const { rowCount } = await pgClient.query(
    getUsers({ where: { id } })
  );
  if (!rowCount)
    error.send(ApiError.NOT_FOUND, 404);

  // Delete user
  await pgClient.query(
    deleteUser(id)
  );
    
  reply
    .code(204)
    .send({ message: ApiResponse.DELETE_USER_SUCCESS });
};
