import type { FastifyReply as Reply, FastifyRequest } from 'fastify';
import type { Query } from '../../types/_index';
import { ApiError, ApiResponse } from '../../types/_index';
import { getUsers, updateUser, deleteUser } from './users.datamapper';

type Request = FastifyRequest<{
  Querystring: Query.querystring;
  Params: { id: number };
  Body: {
    password: string;
    update_user?: {
      pseudo?: string;
      mail?: string;
      password?: string;
    },
  },
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

  console.log(users, rowCount);
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
 * **Put user picture**
 * @description Put user picture by token
*/
export const handlePutUserAvatar = async (request: Request, reply: Reply) => {
  const { pgClient, cloudinary, user, fileManager } = request;
  const { file, fs, pump } = fileManager;
  const { id, pseudo } = user;

  file.path = `/${process.env.STORAGE_TEMP}/${file.fileName}`;

  // Save file to server (Cloudinary uploads supports only local files)
  pump(file.file, fs.createWriteStream(file.path));

  // Upload file to Cloudinary
  const avatar_url = await cloudinary.uploadImg(`avatar_${id}_${pseudo}`, file.path);
  await pgClient.query(updateUser(id, { avatar_url }));

  // Remove temp file from server
  try {
    fs.unlinkSync(file.path);
  } catch (err) {
    // TODO: SERVER ERROR LOG FILES
    // This is not a critical error, so we don't want to stop the process.
    // We do want to trace it in a log file
  }

  reply
    .code(204)
    .send({ message: ApiResponse.UPDATE_USER_PIC_SUCCESS });
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
