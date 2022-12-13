import type { FastifyReply as Reply, FastifyRequest } from 'fastify';
import type { Query } from '../../types/Query';
import type { Payload } from '../../types/Payload';
import { ApiError, ApiResponse } from '../../types/_index';
import { EReviewTypes } from '../../types/_index';
import { EReviewTypesKeys } from '../../types/_index';
import { 
  updateReview, 
  getOneReview, 
  adminDeleteComment, 
  adminGetReviews 
} from './reviews.datamapper';

type Request = FastifyRequest<{
  Querystring: Query.querystring;
  Params: { movieId: number, userId: number };
  Body: Payload.reviewMovie,
}>;

/**
 * **Update one review**
 * @description Update one review object using movie id from params and user id from token.
*/
export const handleReviewMovie = async (request: Request, reply: Reply) => {
  const { pgClient, body, params, user } = request;
  const { movieId: movie_id } = params;
  const { id: user_id, previous_review } = user;
  pgClient.query(
    updateReview(body, { movie_id, user_id })
  );
  const { rows: review } = await pgClient.query(
    getOneReview({ movie_id, user_id })
  );
        
  const response = { 
    message: (() => {
      const key = Object.keys(body)[0] as EReviewTypes;
      if (key === EReviewTypes.COMMENT) {
        const value = previous_review.comment ? 'update' : 'add';
        return EReviewTypesKeys[key][value];
      }
      if (key === EReviewTypes.RATING) {
        const value = previous_review.rating ? 'update' : 'add';
        return EReviewTypesKeys[key][value];
      } else 
        return EReviewTypesKeys[key][body[key] ? 'add' : 'update'];
    })(),
    review: review[0] 
  };

  reply
    .code(201)
    .send(response);
};

/**
 * **Get reviews object (ADMIN)**
 * @description Get reviews according to query.
*/
export const handleAdminGetReviews = async (request: Request, reply: Reply) => {
  const { error, pgClient, query } = request;

  const { rows: reviews, rowCount } = await pgClient.query(
    adminGetReviews(query)
  );

  if (!rowCount)
    error.send(ApiError.NOT_FOUND, 404);

  reply
    .code(200)
    .send(reviews);
};

/**
 * **Delete one review object (ADMIN)**
 * @description Delete one review object using movie id and user id from params.
*/
export const handleAdminDeleteReview = async (request: Request, reply: Reply) => {
  const { pgClient, params } = request;
  const { movieId: movie_id, userId: user_id } = params;

  await pgClient.query(
    adminDeleteComment({ movie_id, user_id })
  );

  reply
    .code(204)
    .send({ message: ApiResponse.DELETE_COMMENT_SUCCESS });  
};
