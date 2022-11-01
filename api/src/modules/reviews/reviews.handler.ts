import type { FastifyReply as Reply, FastifyRequest } from 'fastify';
import type { Database } from '@src/types/Database';
import type { Query } from '@src/types/Query';
import { updateReview, getOneReview, adminDeleteComment, adminGetReviews } from '@modules/reviews/reviews.datamapper';
import reviewResponseFactory from '@src/utils/reviewResponseFactory';

type Request = FastifyRequest<{
  Querystring: Query.querystring;
  Params: { movieId: number, userId: number };
  Body: Record<keyof Pick<Database.review, 'bookmarked' | 'viewed' | 'liked' | 'rating' | 'comment'>, boolean | number | string>,
}>;

/**
 * **Update one review**
 * @description Update one review object using movie id from params and user id from token.
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
    const { rows: review } = await pgClient.query(
      getOneReview({ movie_id, user_id })
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
 * **Get reviews object (ADMIN)**
 * @description Get reviews according to query.
*/
export const handleAdminGetReviews = async (request: Request, reply: Reply) => {
  const { pgClient, query } = request;

  try {
    const { rows: reviews, rowCount } = await pgClient.query(
      adminGetReviews(query)
    );

    if (!rowCount) {
      reply.code(404);
      throw new Error('Aucun résultat.');
    }

    reply.send(reviews);
  } catch (error) {
    reply.send(error);
  }
};

/**
 * **Delete one review object (ADMIN)**
 * @description Delete one review object using movie id and user id from params.
*/
export const handleAdminDeleteReview = async (request: Request, reply: Reply) => {
  const { pgClient, params } = request;
  const { movieId: movie_id, userId: user_id } = params;

  try {
    await pgClient.query(
      adminDeleteComment({ movie_id, user_id })
    );

    reply.send({
      message: 'Commentaire supprimé avec succés.',
    });  
  } catch (error) {
    reply.send(error);
  }
};
