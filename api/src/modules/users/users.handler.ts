import type { FastifyReply as Reply, FastifyRequest } from 'fastify';
import type { Query } from '@src/types/Query';
import { hashPassword } from '@src/utils/bcryptHandler';
import { getUsers } from '@modules/users/users.datamapper';

type Request = FastifyRequest<{
  Querystring: Query.querystring;
  Params: { id: number };
  Body: {
    password: string;
    update_user?: {
      pseudo?: string;
      mail?: string;
      password?: string;
    };
  };
}>;

/**
 * **Get users**
 * @description
 * Get all users from database
 * @query
 * - where[id]: filter by user id
 * - where[pseudo]: filter by user pseudo
 * - where[mail]: filter by user mail
 * - where[role]: filter by user role
 * - select[propositions]: populate with user posted movies
 * - select[reviews]: populate with user posted reviews
 * - select[metrics]: populate with user metrics
*/
export const handleGetUsers = async (request: Request, reply: Reply) => {
  const { pgClient, query } = request;
  try {
    const { rows: users } = await pgClient.query(
      getUsers(query)
    );

    reply.send(users);
  } catch (error) {
    reply.send(error);
  }
};

// export const handlePutUserById = async (request: Request, reply: Reply) => {
//   const { prisma, user, body } = request;
//   const { update_user } = body;
//   const { id } = user;

//   try {
//     if (update_user.password) {
//       // Test and Hash new password
//       if (!update_user.password.match(process.env.PASS_REGEXP)) {
//         reply.code(422); // Unprocessable Entity
//         throw new Error('Le format du mot de passe est invalide.');
//       }
//       update_user.password = await hashPassword(update_user.password);
//     }
    
//     // Update user
//     await prisma.user.update({
//       where: { id },
//       data: { ...update_user },
//     });
    
//     reply.send('Données utilisateur modifiées avec succés.');
//   } catch (error) {
//     reply.send(error);
//   }
// };

// // Admin only
// export const handleDeleteUserById = async (request: Request, reply: Reply) => {
//   const { prisma, params } = request;
//   const { id } = params;

//   try {
//     const user = await prisma.user.delete({ where: { id: Number(id) } });
//     if (!user) {
//       reply.code(404);
//       throw new Error('Utilisateur introuvable.');
//     }

//     reply.send(`Utilisateur "${user.pseudo}" supprimé avec succés.`);
//   } catch (error) {
//     reply.send(error);
//   }
// };
