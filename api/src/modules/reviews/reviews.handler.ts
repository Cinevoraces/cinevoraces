import type { FastifyReply as Reply, FastifyRequest } from 'fastify';
import type { Database } from '@src/types/Database';
import type { Query } from '@src/types/Query';
import { updateReview, getReviews } from '@src/dataMapper/review.dataMapper';
import reviewResponseFactory from '@src/utils/reviewResponseFactory';

type Request = FastifyRequest<{
  Querystring: Query.querystring;
  Params: { movieId: number, userId: number };
  Body: Record<keyof Pick<Database.review, 'bookmarked' | 'viewed' | 'liked' | 'rating' | 'comment'>, unknown>,
}>;

/**
 * **Update one review object**
 * @description
 * Update one review object using movie id from params and user id from token.
 * @body {review} - Review object
*/
export const handleReviewMovie = async (request: Request, reply: Reply) => {
  const { pgClient, body, params, user } = request;
  const { movieId: movie_id } = params;
  const { id: user_id, previous_review } = user;
  try { 
    pgClient.query(
      updateReview(body, { movie_id, user_id })
    );
    // FIXME: Return 500
    const { rows: review } = await pgClient.query(
      getReviews({ 
        values: { movie_id, user_id },
        select: ['bookmarked', 'viewed', 'liked', 'rating', 'comment']
      })
    );

    const message = reviewResponseFactory(
      body as Partial<Database.review>, 
      previous_review
    );

    reply.send({
      message,
      review: review[0],
    });
  } catch (error) {
    reply.send(error);
  }
};

/**
 * **Get all reviews object (ADMIN)**
 * @description
 * Get all reviews from database
 * @query
 * - filter[movie_id]: filter by movie id
 * - filter[user_id]: filter by user id
*/
export const handleGetAllReviews = async (request: Request, reply: Reply) => {
  const { pgClient, query } = request;
  // const { where } = queryFactory(query, 'review');
  try {
    // const { rows } = await pgClient.query({
    //   text: 'SELECT * FROM "review" $1;',
    //   values: [where]
    // });

    // reply.send(reviews);
  } catch (error) {
    reply.send(error);
  }
};

/**
 * **Delete one review object (ADMIN)**
 * @description
 * Delete one review object using movie id and user id from params.
*/
export const handleDeleteReview = async (request: Request, reply: Reply) => {
  const { pgClient, params } = request;
  const { movieId: movie_id, userId: user_id } = params;

  try {
    // await prisma.review.delete({
    //   where: { user_id_movie_id: { user_id, movie_id } },
    // });

    reply.send({
      message: 'Objet review supprimé avec succés.',
    });  
  } catch (error) {
    reply.send(error);
  }
};
