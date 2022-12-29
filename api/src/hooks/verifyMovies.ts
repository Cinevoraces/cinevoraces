import type {
  FastifyRequest as Request,
  FastifyReply as Reply,
  FastifyPluginCallback,
} from 'fastify';
import type { proposeMovie, updateProposedMovie } from '../types/_index';
import { ApiError } from '../types/_index';
import plugin from 'fastify-plugin';

export const verifyMoviesHooks: FastifyPluginCallback = async (
  fastify, opts, done
) => {

  /**
   * **Movie existence verification**
   * @preValidation
   * @description
   * This hook verifies if a movie exist in database.
  */
  fastify.decorate('doesMovieExist', async (
    request: Request<{ Params?: { id: number }; }>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    reply: Reply
  ) => {
    const { error, pgClient, params } = request;

    const { rowCount: movies } = await pgClient.query({
      text: ' SELECT * FROM movie WHERE id = $1;',
      values: [params.id],
    });

    if (!movies)
      error.send(ApiError.NOT_FOUND_MOVIE_ID, 404);
  });

  /**
   * **Movie's is_published state verification**
   * @preValidation
   * @description
   * This hook verifies if a movie has been published.
  */
  fastify.decorate('putMovieSafeGuards', async (
    request: Request<{ Params?: { id: number }; Body?: updateProposedMovie }>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    reply: Reply
  ) => {
    const { error, pgClient, user, body, params } = request;
    const query = { text: '', values: [] as Array<number> };

    // Admin route case.
    if (params) {
      query.text = `SELECT is_published FROM movie
                      WHERE id = $1 
                      AND is_published = false;`;
      query.values = [params.id];
    }
    // User route case.
    if (body.movie_id) {
      query.text = `SELECT is_published FROM movie
                      WHERE user_id = $1 
                      AND is_published = false 
                      AND id = $2;`;
      query.values = [user.id, body.movie_id];
    }

    const { rowCount: proposition } = await pgClient.query(query);
    
    if (!proposition)
      error.send(ApiError.NOT_FOUND_PROPOSAL, 404);
  });

  /**
   * **Movies/Episode checks before new movie proposition as user**
   * @preValidation
   * @description
   * This hook verifies if the user has already a pending proposition, if the movie doesn't exist
   * and if the episode is already booked.
   */
  fastify.decorate('movieProposalSafeGuards', async (
    request: Request<{ Body: proposeMovie }>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    reply: Reply
  ) => {
    const { error, pgClient, body, user } = request;
    const { episode_id, french_title, original_title } = body;
    const { id } = user;

    // User pending proposition check
    const { rowCount: proposedMovie } = await pgClient.query({
      text: ` SELECT id AS movie_id, user_id, is_published
                FROM movie
                WHERE is_published = false AND user_id = $1;`,
      values: [id],
    });
    if (proposedMovie) 
      error.send(ApiError.USER_HAS_PROPOSAL, 401);
    
    // Movie existence check
    const { rowCount: movieExist } = await pgClient.query({
      text: ` SELECT french_title, original_title, release_date
                  FROM movie
                  WHERE french_title = $1 AND original_title = $2;`,
      values: [french_title, original_title],
    });
    if (movieExist) 
      error.send(ApiError.INVALID_PROPOSAL, 422);

    // Episode availability check
    const { rowCount: episode } = await pgClient.query({
      text: ` SELECT ep.id FROM "episode" ep 
              LEFT JOIN (SELECT "movie".id, "movie".episode_id FROM movie) mv ON mv.episode_id = ep.id
              WHERE ep.id = $1 AND mv.id IS NULL;`,
      values: [episode_id],
    });
    if (!episode)
      error.send(ApiError.UNAVAILABLE_EPISODE, 401);
  });

  done();
};

export default plugin(verifyMoviesHooks);
