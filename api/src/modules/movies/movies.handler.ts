import type { FastifyReply as Reply, FastifyRequest } from 'fastify';
import type { Query } from '@src/types/Query';
import { getMovies } from '@modules/movies/movies.dataMapper';
import { getReviewsByUserId } from '@modules/reviews/reviews.datamapper';

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

    reply.send(movies);
  } catch (error) {
    reply.send(error);
  }
};
