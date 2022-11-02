import type { FastifyReply as Reply, FastifyRequest } from 'fastify';
import type { Query } from '@src/types/Query';
import type { Payload } from '@src/types/Payload';
import { hashPassword } from '@src/utils/bcryptHandler';
import { getUsers, updateUser, deleteUser } from '@modules/users/users.datamapper';

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
  const { pgClient, query } = request;
  try {
    const { rows: users, rowCount } = await pgClient.query(
      getUsers(query)
    );
    if (!rowCount) {
      reply.code(404); // Not found
      throw new Error('Aucun utilisateur trouvé.');
    }

    reply
      .code(200) // OK
      .send(users);
  } catch (error) {
    reply.send(error);
  }
};

/**
 * **Put user**
 * @description Put user by token
*/
export const handlePutUser = async (request: Request, reply: Reply) => {
  const { pgClient, user, body } = request;
  const { update_user } = body;
  const { id } = user;

  try {
    if (update_user.password) {
      // Test and Hash new password
      if (!update_user.password.match(process.env.PASS_REGEXP)) {
        reply.code(422); // Unprocessable Entity
        throw new Error('Le format du mot de passe est invalide.');
      }
      update_user.password = await hashPassword(update_user.password);
    }
    
    // Update user
    await pgClient.query(
      updateUser(id, update_user)
    );

    reply
      .code(204) // No Content
      .send({ message: 'Données utilisateur modifiées avec succés.' });
  } catch (error) {
    reply.send(error);
  }
};

/**
 * **Delete one user (ADMIN)**
 * @description Delete one user by id
*/
export const handleAdminDeleteUserById = async (request: Request, reply: Reply) => {
  const { pgClient, params } = request;
  const { id } = params;

  try {
    // Check if user exists
    const { rowCount } = await pgClient.query(
      getUsers({ where: { id } })
    );
    if (!rowCount) {
      reply.code(404); // Not found
      throw new Error('Aucun utilisateur trouvé.');
    }

    // Delete user
    await pgClient.query(
      deleteUser(id)
    );
    
    reply
      .code(204) // No Content
      .send({ message: 'Utilisateur supprimé avec succés.' });
  } catch (error) {
    reply.send(error);
  }
};
