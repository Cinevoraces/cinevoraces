import type {
  FastifyRequest as Request,
  FastifyReply as Reply,
  FastifyPluginCallback,
} from 'fastify';
import { EErrorMessages } from '../models/enums/_index';
import type { PPutMovie, PPostMovie } from '../models/types/_index';
import plugin from 'fastify-plugin';

export default plugin((async (fastify, opts, done) => {

  /**
   * @preValidation 
   * @description Movie existence verification
   */// eslint-disable-next-line @typescript-eslint/no-unused-vars
  fastify.decorate('throwIfMovieNotFound', async (request: Request<{ Params?: { id: number }; }>, reply: Reply) => {
    const { _errorService, _movieService } = fastify;
    const isMovie = await _movieService.checkMovieExistanceById(request.params.id);
    if (!isMovie)
      _errorService.send(EErrorMessages.NOT_FOUND_MOVIE_ID, 404);
  });

  /**
   * @preValidation 
   * @description Movie existence verification
   */// eslint-disable-next-line @typescript-eslint/no-unused-vars
  fastify.decorate('throwIfMovieFound', async (request: Request<{ Body: { original_title: string, french_title: string } }>, reply: Reply) => {
    const { _errorService, _movieService } = fastify;
    const { original_title, french_title } = request.body;
    const isMovie = await _movieService.checkMovieExistanceByName(original_title, french_title);
    if (isMovie)
      _errorService.send(EErrorMessages.ALREADY_POSTED_MOVIE, 401);
  });

  /**
   * @preValidation
   * @description This hook verifies if a movie has been published.
   */// eslint-disable-next-line @typescript-eslint/no-unused-vars
  fastify.decorate('throwIfMovieIsPublished', async (request: Request<{ Body: PPutMovie }>, reply: Reply) => {
    const { _errorService, _movieService } = fastify;
    const isDraft = await _movieService.isMoviePublished(request.body.movie_id, request.user.id);
    if (!isDraft)
      _errorService.send(EErrorMessages.NOT_FOUND_PROPOSAL, 404);
  });

  /**
   * @preValidation
   * @description This hook verifies if the user has already a pending proposition, 
   * if the movie doesn't exist and if the episode is already booked.
   */// eslint-disable-next-line @typescript-eslint/no-unused-vars
  fastify.decorate('throwIfProposalChecksFails', async (request: Request<{ Body: PPostMovie }>, reply: Reply) => {
    const { _errorService, _movieService } = fastify;
    const { body, user } = request;
    const { episode_id, french_title, original_title } = body;
    const { id } = user;

    // User pending proposition check
    const proposedMovie = await _movieService.doesUserHasPendingProposition(id);
    if (proposedMovie) 
      _errorService.send(EErrorMessages.USER_HAS_PROPOSAL, 401);
    
    // Movie existence check
    const movieExist = await _movieService.checkMovieExistanceByName(original_title, french_title);
    if (movieExist) 
      _errorService.send(EErrorMessages.INVALID_PROPOSAL, 422);

    // Episode availability check
    const isEpisodeAvailable = await _movieService.checkEpisodeAvailability(episode_id);
    if (!isEpisodeAvailable)
      _errorService.send(EErrorMessages.UNAVAILABLE_EPISODE, 401);
  });

  /**
   * @preValidation
   * @description This hook verifies if a movie has been published as Admin.
   */// eslint-disable-next-line @typescript-eslint/no-unused-vars
  fastify.decorate('adminThrowIfMovieIsPublished', async (request: Request<{ Params: { id: number } }>, reply: Reply) => {
    const { _errorService, _movieService } = fastify;
    const isDraft = await _movieService.isMoviePublished(request.params.id);
    if (!isDraft)
      _errorService.send(EErrorMessages.NOT_FOUND_PROPOSAL, 404);
  });

  done();
}) as FastifyPluginCallback);
