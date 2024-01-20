import { AuthService, MovieService } from '@src/services';
import { type FastifyReply as Reply, type FastifyRequest as Request } from 'fastify';
import plugin from 'fastify-plugin';
import schemas from './schemas';
import type { GETMoviePosterRequest, POSTMovieRequest, PUTMovieRequest } from './types';

export default plugin(async fastify => {
    const authService = new AuthService(fastify.postgres);
    const movieService = new MovieService(fastify.postgres);
    fastify.addSchemas(schemas);

    fastify.route({
        method: 'GET',
        url: '/movies',
        schema: fastify.getSchema('API:GET/movies'),
        handler: async (request: Request, reply: Reply) => {
            const { query } = request;
            const user = await authService.verifyAccessTokenOptionnal(request);
            const { rows: movies, rowCount } = await movieService.getMoviesByQuery(query);

            if (!rowCount) {
                throw new ServerError(404, 'NOT_FOUND', 'Aucun film trouvé'); // issues/168
            }

            // FIXME: This solution must be treated using SQL.
            // Populate movies with user existing reviews if logged
            if (user && rowCount) {
                const { rows: reviews, rowCount: reviewCount } = await fastify.postgres.query({
                    text: ` 
                        SELECT movie_id, user_id, bookmarked, liked, viewed, rating
                        FROM "review" WHERE user_id = $1;`,
                    values: [user.id],
                });

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

    fastify.route({
        method: 'GET',
        url: '/movies/random-posters/:count',
        schema: fastify.getSchema('API:GET/movies/random-posters/:count'),
        handler: async (request: Request<GETMoviePosterRequest>, reply: Reply) => {
            const posters = await movieService.getRandomMoviePosters(request.params.count);
            if (request.params.count) throw new ServerError(400);
            reply.code(200).send(posters);
        },
    });

    fastify.route({
        method: 'POST',
        url: '/movies',
        schema: fastify.getSchema('API:POST/movies'),
        handler: async (request: Request<POSTMovieRequest>, reply: Reply) => {
            await authService.verifyAccessToken(request);
            const movie = request.body;
            const poster_url = movie.poster_url;
            delete movie.poster_url;

            // Insert movie in database
            const payload = {
                ...movie,
                user_id: request.user.id,
            };
            const movieId = await movieService.createMovie(payload);

            // Save poster to DB
            await movieService.uploadMoviePoster(movieId, poster_url);

            reply.code(200).send({ message: 'Votre proposition a bien été enregistrée.' }); // issues/168
        },
    });

    fastify.route({
        method: 'PUT',
        url: '/movies',
        schema: fastify.getSchema('API:PUT/movies'),
        handler: async (request: Request<PUTMovieRequest>, reply: Reply) => {
            await authService.verifyAccessToken(request);
            await movieService.updateUnpublishedMovie(request.body);
            reply.code(201).send({ message: 'Votre proposition a bien été mise à jour.' }); // issues/168
        },
    });
});
