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
   * **Proposition duplicate check**
   * @preValidation
   * @description
   * This hook verifies if a movie already exist before proposition.
  */
  fastify.decorate('doesPropositionExist', async (
    request: Request,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    reply: Reply
  ) => {
    const { error, pgClient, body } = request;
    const { french_title, original_title } = body as proposeMovie;

    const { rowCount: movieExist } = await pgClient.query({
      text: ` SELECT french_title, original_title, release_date
                  FROM movie
                  WHERE french_title = $1 AND original_title = $2;`,
      values: [french_title, original_title],
    });
    if (movieExist) 
      error.send(ApiError.INVALID_PROPOSAL, 422);
  });

  /**
   * **Movie's is_published state verification as user**
   * @preValidation
   * @description
   * This hook verifies if a movie has been published.
  */
  fastify.decorate('isMoviePublished', async (
    request: Request<{ Params?: { id: number }; }>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    reply: Reply
  ) => {
    const { error, pgClient, user, body, params } = request;
    const query = { text: '', values: [] as Array<number> };

    // If 'param' is defined, it means that this is the Admin route.
    if (params) {
      query.text = `SELECT is_published FROM movie
                      WHERE id = $1 
                      AND is_published = false;`;
      query.values = [params.id];
    }
    // If body's 'movie_id' is defined, it means that this is the User route.
    if ((body as updateProposedMovie).movie_id) {
      query.text = `SELECT is_published FROM movie
                      WHERE user_id = $1 
                      AND is_published = false 
                      AND id = $2;`;
      query.values = [user.id, (body as updateProposedMovie).movie_id];
    }

    const { rowCount: proposition } = await pgClient.query(query);
    
    if (!proposition)
      error.send(ApiError.NOT_FOUND_PROPOSAL, 404);
  });

  /**
   * **Proposition verification**
   * @preValidation
   * @description
   * This hook verifies if the user already has a proposition and
   * throw an error if it's the case.
  */
  fastify.decorate('hasProposition', async (
    request: Request,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    reply: Reply
  ) => {
    const { error, pgClient, user } = request;
    const { id } = user;

    const { rowCount: proposedMovie } = await pgClient.query({
      text: ` SELECT id AS movie_id, user_id, is_published
                FROM movie
                WHERE is_published = false AND user_id = $1;`,
      values: [id],
    });

    if (proposedMovie) 
      error.send(ApiError.USER_HAS_PROPOSAL, 401);
  });

  /**
   * **Episode state verification**
   * @preValidation
   * @description
   * This hook verifies episode state.
   * It takes care of Admin and User cases.
  */
  fastify.decorate('isEpisodeBooked', async (
    request: Request<{ Params?: { id: number }; }>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    reply: Reply
  ) => {
    const { error, pgClient, params, url } = request;
    const { id: episodeId } = params;

    const { rowCount: bookedEpisode } = await pgClient.query({
      text: ` SELECT is_booked
                FROM episode
                WHERE id = $1 AND is_booked = true;`,
      values: [episodeId],
    });

    // TODO: Add User case in another hook (episode_id in body)
    // If episode booking route is called
    if (url.includes('/episodes/book') && bookedEpisode) 
      error.send(ApiError.UNAVAILABLE_EPISODE, 401);
    // If episode unbooking route is called
    if (url.includes('/admin/episodes/unbook') && !bookedEpisode)
      error.send(ApiError.UNBOOKED_EPISODE, 406);
  });

  done();
};

export default plugin(verifyMoviesHooks);
