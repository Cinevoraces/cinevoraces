import { ESchemasIds, type PostMovie, type PutMovie } from '@src/types';
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
            const { _movieService, _reviewService } = this;

            const { rows: movies, rowCount } = await _movieService.getMoviesByQuery(query);
            if (!rowCount) {
                // issues/168 - FIXME: This isn't an error
                throw new ServerError(404, 'NOT_FOUND', 'Aucun film trouvé');
            }

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
            const { _movieService } = this;
            const posters = await _movieService.getRandomMoviePosters(request.params.count);
            if (request.params.count) throw new ServerError(400);

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
            const { _movieService } = this;
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
            await _movieService.uploadMoviePoster(movieId, poster_url);

            // issues/168 - FIXME: This should not return the final message
            reply.code(200).send({ message: 'Votre proposition a bien été enregistrée.' });
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

            // issues/168 - FIXME: This should not return the final message
            reply.code(201).send({ message: 'Votre proposition a bien été mise à jour.' });
        },
    });
};
