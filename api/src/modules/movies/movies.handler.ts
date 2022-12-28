import type { FastifyReply as Reply, FastifyRequest } from 'fastify';
import type {
  Query,
  proposeMovie as TProposeMovie,
  updateProposedMovie as TUpdateProposedMovie,
} from '../../types/_index';
import { ApiError, ApiResponse } from '../../types/_index';
import { getReviewsByUserId } from '../reviews/reviews.datamapper';
import { 
  getMovies, 
  proposeMovie, 
  updateProposedMovie, 
  publishMovie, 
  deleteMovie 
} from './movies.datamapper';

type Request = FastifyRequest<{
  Querystring: Query.querystring;
}>;

/**
 * **Get movies**
 * @description Get movies according to query.
*/
export const handleGetMovies = async (request: Request, reply: Reply) => {
  const { error, pgClient, query, user } = request;

  const { rows: movies, rowCount } = await pgClient.query(
    getMovies(query)
  );
  if (!rowCount) 
    error.send(ApiError.NOT_FOUND_MOVIE, 404);

  // TODO: 2. This solution must be treated using SQL.
  // Populate movies with user existing reviews if logged
  if (user) {
    const { rows: reviews, rowCount: reviewCount } = await pgClient.query(
      getReviewsByUserId(user.id)
    );
    reviewCount && movies.forEach(movie => {
      const user_review = reviews.find(review => review.movie_id === movie.id);
      if (user_review) {
        const { bookmarked, viewed, liked, rating } = user_review;
        movie.user_review = { bookmarked, viewed, liked, rating };
      }
    });
  }

  reply
    .code(200)
    .send(movies);
};

/**
 * **Propose Movie**
 * @description Propose a movie.
*/
export const handleProposeMovie = async (
  request: FastifyRequest<{
    Querystring: Query.querystring;
    Body: TProposeMovie;
  }>, 
  reply: Reply
) => {
  const { pgClient, body, user } = request;
  const payload = { ...body, user_id: user.id };
  
  await pgClient.query(
    proposeMovie(payload)
  );

  reply
    .code(201)
    .send({ message: ApiResponse.PROPOSITION_SUCCESS });
};

/**
 * **Update Proposed Movie**
 * @description Update a proposed movie.
 */
export const handleUpdateProposedMovie = async (
  request: FastifyRequest<{
    Querystring: Query.querystring;
    Body: TUpdateProposedMovie;
  }>,
  reply: Reply
) => {
  const { pgClient, body } = request;

  await pgClient.query(
    updateProposedMovie(body)
  );

  reply
    .code(201)
    .send({ message: ApiResponse.PROPOSITION_UPDATE_SUCCESS });
};

/**
 * **Publish a pending proposition**
 * @description Publish a pending proposition.
 */
export const handleAdminPublishMovie = async (
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: Reply
) => {
  const { pgClient, params } = request;
  const { id } = params;
  await pgClient.query(
    publishMovie(id)
  );

  reply
    .code(204)
    .send({ message: ApiResponse.PROPOSITION_PUBLICATION_SUCCESS });
};

/**
 * **Delete one movie**
 * @description Delete one movie.
 */
export const handleAdminDeleteMovie = async (
  request: FastifyRequest<{ Params: { id: number } }>,
  reply: Reply
) => {
  const { pgClient, params } = request;
  const { id } = params;
  await pgClient.query(
    deleteMovie(id)
  );

  reply
    .code(204)
    .send({ message: ApiResponse.DELETE_MOVIE_SUCCESS });
};
