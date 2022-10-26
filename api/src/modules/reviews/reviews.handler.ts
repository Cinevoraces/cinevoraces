// import type { FastifyReply as Reply, FastifyRequest } from 'fastify';
// import type { review } from '@prisma/client';
// import type Query from '@src/types/Query';
// import reviewResponseFactory from '@src/utils/reviewResponseFactory';
// import queryFactory from '@src/utils/queryFactory';

// type Request = FastifyRequest<{
//   Querystring: Query.querystring;
//   Params: { movieId: number, userId: number };
//   Body: review;
// }>;

// /**
//  * **Update one review object**
//  * @description
//  * Update one review object using movie id from params and user id from token.
//  * @body {review} - Review object
// */
// export const handleReviewMovie = async (request: Request, reply: Reply) => {
//   const { prisma, body, params, user } = request;
//   const { movieId: movie_id } = params;
//   const { id: user_id, previous_review } = user;

//   try {    
//     const review: review = await prisma.review.update({
//       where: { user_id_movie_id: { user_id, movie_id } },
//       data: { ...body },
//     });
//     const message = reviewResponseFactory(body, previous_review);

//     reply.send({
//       message,
//       review,
//     });
//   } catch (error) {
//     reply.send(error);
//   }
// };

// /**
//  * **Get all reviews object (ADMIN)**
//  * @description
//  * Get all reviews from database
//  * @query
//  * - filter[movie_id]: filter by movie id
//  * - filter[user_id]: filter by user id
// */
// export const handleGetAllReviews = async (request: Request, reply: Reply) => {
//   const { prisma, query } = request;
//   const { where } = queryFactory(query, 'review');
//   try {
//     const reviews = await prisma.$queryRaw`
//       SELECT * FROM "review" ${where};
//     `;

//     reply.send(reviews);
//   } catch (error) {
//     reply.send(error);
//   }
// };

// /**
//  * **Delete one review object (ADMIN)**
//  * @description
//  * Delete one review object using movie id and user id from params.
// */
// export const handleDeleteReview = async (request: Request, reply: Reply) => {
//   const { prisma, params } = request;
//   const { movieId: movie_id, userId: user_id } = params;

//   try {
//     await prisma.review.delete({
//       where: { user_id_movie_id: { user_id, movie_id } },
//     });

//     reply.send({
//       message: 'Objet review supprimé avec succés.',
//     });  
//   } catch (error) {
//     reply.send(error);
//   }
// };
