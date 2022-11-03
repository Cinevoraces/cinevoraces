import type { FastifyReply as Reply, FastifyRequest } from 'fastify';
import type { Query } from '@src/types/Query';
import type { Payload } from '@src/types/Payload';
import { getReviewsByUserId } from '@modules/reviews/reviews.datamapper';
import { 
  getMovies, 
  proposeMovie, 
  updateProposedMovie, 
  publishMovie, 
  deleteMovie 
} from '@modules/movies/movies.dataMapper';

type Request = FastifyRequest<{
  Querystring: Query.querystring;
}>;

/**
 * **Get movies**
 * @description Get movies according to query.
*/
export const handleGetMovies = async (request: Request, reply: Reply) => {
  const { pgClient, query, user } = request;

  try {
    const { rows: movies, rowCount } = await pgClient.query(
      getMovies(query)
    );
    if (!rowCount) {
      reply.code(404);
      throw new Error('Aucun film trouvé');
    }

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
      .code(200) // OK
      .send(movies);
  } catch (error) {
    reply.send(error);
  }
};

/**
 * **Propose Movie**
 * @description Propose a movie.
*/
export const handleProposeMovie = async (
  request: FastifyRequest<{
    Querystring: Query.querystring;
    Body: Payload.proposeMovie;
  }>, 
  reply: Reply
) => {
  const { pgClient, body, user } = request;
  // TODO: 1. Change SQL Function to allow user_id to be declared at the last index
  // Payload must be declared this way to add user_id with token
  // and keep keys order.
  const payload = { 
    french_title: body.french_title,
    original_title: body.original_title,
    poster_url: body.poster_url,
    directors: body.directors,
    release_date: body.release_date,
    runtime: body.runtime,
    casting: body.casting,
    presentation: body.presentation,
    publishing_date: body.publishing_date,
    user_id: user.id,
    season_id: body.season_id,
    movie_genres: body.movie_genres,
    movie_languages: body.movie_languages,
    movie_countries: body.movie_countries,
  };
  
  try {
    await pgClient.query(
      proposeMovie(payload)
    );

    reply
      .code(201) // Created
      .send({ message: 'Votre proposition a bien été enregistrée.' });
  } catch (error) {
    reply.send(error);
  }
};

/**
 * **Update Proposed Movie**
 * @description Update a proposed movie.
 */
export const handleUpdateProposedMovie = async (
  request: FastifyRequest<{
    Querystring: Query.querystring;
    Body: Payload.updateProposedMovie;
  }>,
  reply: Reply
) => {
  const { pgClient, body } = request;

  try {
    await pgClient.query(
      updateProposedMovie(body)
    );

    reply
      .code(201) // OK
      .send({ message: 'Votre proposition a bien été mise à jour.' });
  } catch (error) {
    reply.send(error);
  }
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
  try {
    await pgClient.query(
      publishMovie(id)
    );

    reply
      .code(204) // No Content
      .send({ message: 'Film publié.' });
  } catch (error) {
    reply.send(error);
  }
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
  try {
    await pgClient.query(
      deleteMovie(id)
    );

    reply
      .code(204) // No Content
      .send({ message: 'Film supprimé.' });
  } catch (error) {
    reply.send(error);
  }
};
