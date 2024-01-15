import { EErrorMessages, EResponseMessages, ESchemasIds, type PostMovie, type PutMovie } from '@src/types';
import { type FastifyInstance, type FastifyReply as Reply, type FastifyRequest as Request } from 'fastify';

/**
 * @description Movies API.
 * @prefix /
 */
export default async (fastify: FastifyInstance) => {
    /**
     * @description Get Movies.
     * @route GET /movies
     */
    fastify.route({
        method: 'GET',
        url: '/movies',
        schema: fastify.getSchema(ESchemasIds.GETMovies),
        onRequest: [fastify.verifyAccessTokenOptionnal],
        handler: async function (request: Request, reply: Reply) {
            const { query, user } = request;
            const { _movieService, _reviewService, _errorService } = this;

            const { rows: movies, rowCount } = await _movieService.getMoviesByQuery(query);
            if (!rowCount) _errorService.send(EErrorMessages.NOT_FOUND_MOVIE, 404);
            // TODO: This solution must be treated using SQL.
            // Populate movies with user existing reviews if logged
            if (user) {
                const { rows: reviews, rowCount: reviewCount } = await _reviewService.getReviewsByUserId(user.id);
                reviewCount &&
                    movies.forEach(movie => {
                        const user_review = reviews.find(review => review.movie_id === movie.id);
                        if (user_review) {
                            const { bookmarked, viewed, liked, rating } = user_review;
                            movie.user_review = { bookmarked, viewed, liked, rating };
                        }
                    });
            }

            reply.code(200).send(movies);
        },
    });

    /**
     * @description Get Random Movie ids.
     * @route GET /movies/random-posters/:count
     */
    fastify.route({
        method: 'GET',
        url: '/movies/random-posters/:count',
        schema: fastify.getSchema(ESchemasIds.GETRandomMoviePosters),
        handler: async function (request: Request<{ Params: { count: number } }>, reply: Reply) {
            const { _movieService, _errorService } = this;

            const posters = await _movieService.getRandomMoviePosters(request.params.count);
            if (posters.length < request.params.count || !posters.length)
                _errorService.send(EErrorMessages.NOT_FOUND_MOVIE, 404);

            reply.code(200).send(posters);
        },
    });

    /**
     * @description Propose a new movie.
     * @route POST /movies
     */
    fastify.route({
        method: 'POST',
        url: '/movies',
        schema: fastify.getSchema(ESchemasIds.POSTMovies),
        onRequest: [fastify.verifyAccessToken],
        preValidation: [fastify.throwIfMovieFound],
        handler: async function (request: Request, reply: Reply) {
            const { _movieService, _fileService } = this;
            const movie = request.body as PostMovie;
            // Get poster url and delete it from payload as it's not a movie property
            const poster_url = movie.poster_url;
            delete movie.poster_url;

            // Insert movie in database
            const payload = {
                ...movie,
                user_id: request.user.id,
            };
            const movieId = await _movieService.insertNewMovie(payload);
            // Save poster to DB
            await _fileService.UploadMoviePoster(movieId, poster_url);

            reply.code(200).send({ message: EResponseMessages.PROPOSITION_SUCCESS });
        },
    });

    /**
     * @description Update current proposition.
     * @route PUT /movies
     */
    fastify.route({
        method: 'PUT',
        url: '/movies',
        schema: fastify.getSchema(ESchemasIds.PUTMovies),
        onRequest: [fastify.verifyAccessToken],
        preValidation: [fastify.throwIfMovieIsPublished],
        handler: async function (request: Request, reply: Reply) {
            const { _movieService } = this;
            await _movieService.updateUnpublishedMovie(request.body as PutMovie);
            reply.code(201).send({ message: EResponseMessages.PROPOSITION_UPDATE_SUCCESS });
        },
    });

    /**
     * @description Publish a pending proposition.
     * @route PUT /admin/movies/publish/:id
     */
    fastify.route({
        method: 'PUT',
        url: '/admin/movies/publish/:id',
        schema: fastify.getSchema(ESchemasIds.PUTMoviesAsAdmin),
        onRequest: [fastify.isAdmin],
        preValidation: [fastify.verifyPassword, fastify.adminThrowIfMovieIsPublished],
        handler: async function (request: Request<{ Params: { id: number } }>, reply: Reply) {
            const { _movieService } = this;
            await _movieService.publishMovie(request.params.id);
            reply.code(201).send({ message: EResponseMessages.PROPOSITION_PUBLICATION_SUCCESS });
        },
    });

    /**
     * @description Delete one movie.
     * @route DELETE /admin/movies
     */
    fastify.route({
        method: 'DELETE',
        url: '/admin/movies/:id',
        schema: fastify.getSchema(ESchemasIds.DELETEMoviesAsAdmin),
        onRequest: [fastify.isAdmin],
        preValidation: [fastify.verifyPassword, fastify.throwIfMovieNotFound],
        handler: async function (request: Request<{ Params: { id: number } }>, reply: Reply) {
            await this._movieService.deleteMovie(request.params.id);

            reply.code(201).send({ message: EResponseMessages.DELETE_MOVIE_SUCCESS });
        },
    });
};
