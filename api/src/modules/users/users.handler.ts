// import type { FastifyReply as Reply, FastifyRequest } from 'fastify';
// import type { userMetrics } from '@src/types/Metrics';
// import type Query from '@src/types/Query';
// import { hashPassword } from '@src/utils/bcryptHandler';
// import queryFactory from '@src/utils/queryFactory';

// type Request = FastifyRequest<{
//   Querystring: Query.querystring;
//   Params: { id: number };
//   Body: {
//     password: string;
//     update_user?: {
//       pseudo?: string;
//       mail?: string;
//       password?: string;
//     };
//   };
// }>;

// /**
//  * **Get all users**
//  * @description
//  * Get all users from database
//  * @query
//  * - filter[pseudo]: filter by user pseudo
//  * - filter[mail]: filter by user mail
//  * - filter[role]: filter by user role
//  * - pop[movies]: populate with user posted movies
//  * - pop[reviews]: populate with user posted reviews
// */
// export const handleGetUsers = async (request: Request, reply: Reply) => {
//   const { prisma, query } = request;
//   const { where } = queryFactory(query, 'user');

//   try {
//     const users = await prisma.$queryRaw`
//       SELECT
//         u.id, u.pseudo, u.mail, u.avatar_url, u.role, u.created_at, u.updated_at
//       FROM "user" u
//       ${where}
//     ;
//   `;

//     reply.send(users);
//   } catch (error) {
//     reply.send(error);
//   }
// };

// export const handleGetUserById = async (request: Request, reply: Reply) => {
//   const { prisma, query, params } = request;
//   const { id } = params;
//   const metrics = query.pop?.metrics;
//   const prismaQuery = prismaQueryFactory(query, 'User');

//   try {
//     let response;

//     const user = await prisma.user.findFirst({
//       ...prismaQuery,
//       where: { id },
//     });

//     if (metrics) {
//       const rawQuery = await prisma.$queryRaw`
//         SELECT * FROM indiv_actions_metrics WHERE id = ${id};
//       `;
//       response = { 
//         ...user,
//         metrics: (rawQuery as Array<userMetrics>)[0] 
//       };
//     } else {
//       response = user;
//     }

//     reply.send(response);
//   } catch (error) {
//     reply.send(error);
//   }
// };

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
