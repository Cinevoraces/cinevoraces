import { AuthService, MovieService, ReviewService, SeasonService, UserService } from '@src/services';
import { type FastifyReply as Reply, type FastifyRequest as Request } from 'fastify';
import plugin from 'fastify-plugin';
import schemas from './schemas';
import type {
    DELETECommentAsAdminRequest,
    DELETEMovieAsAdminRequest,
    DELETEUserAsAdminRequest,
    PUTMovieAsAdminRequest,
} from './types';
import { type POSTSeasonRequest } from './types';

export default plugin(async fastify => {
    const authService = new AuthService(fastify.postgres);
    const movieService = new MovieService(fastify.postgres);
    const reviewService = new ReviewService(fastify.postgres);
    const seasonService = new SeasonService(fastify.postgres);
    const userService = new UserService(fastify.postgres);
    fastify.addSchemas(schemas);

    // ------------//
    //    Movies   //
    // ------------//
    fastify.route({
        method: 'PUT',
        url: '/admin/movies/publish/:id',
        schema: fastify.getSchema('API:PUT/admin/movies/publish/:id'),
        handler: async (request: Request<PUTMovieAsAdminRequest>, reply: Reply) => {
            await authService.verifyPasswordOrThrow(request.user.id, request.body.password);
            await authService.isAdmin(request);
            await movieService.publishMovie(request.params.id);
            reply.code(201).send({ message: 'La proposition a bien été publiée.' }); // issues/168
        },
    });

    fastify.route({
        method: 'DELETE',
        url: '/admin/movies/:id',
        schema: fastify.getSchema('API:DELETE/admin/movies/:id'),
        handler: async (request: Request<DELETEMovieAsAdminRequest>, reply: Reply) => {
            await authService.verifyPasswordOrThrow(request.user.id, request.body.password);
            await authService.isAdmin(request);
            await movieService.deleteMovie(request.params.id);
            reply.code(201).send({ message: 'Le film a bien été supprimée.' }); // issues/168
        },
    });

    // ------------//
    //   Reviews   //
    // ------------//
    fastify.route({
        method: 'GET',
        url: '/admin/reviews',
        schema: fastify.getSchema('API:GET/admin/reviews'),
        handler: async (request: Request, reply: Reply) => {
            await authService.isAdmin(request);
            const { rows: reviews } = await reviewService.getReviews(request.query);
            reply.code(200).send(reviews);
        },
    });

    fastify.route({
        method: 'DELETE',
        url: '/admin/reviews/:movieId/:userId',
        schema: fastify.getSchema('API:DELETE/admin/reviews/:movieId/:userId'),
        handler: async (request: Request<DELETECommentAsAdminRequest>, reply: Reply) => {
            const { movieId, userId } = request.params;
            await authService.verifyPasswordOrThrow(request.user.id, request.body.password);
            await authService.isAdmin(request);
            await reviewService.deleteComment(movieId, userId);
            reply.code(201).send({ message: 'Commentaire supprimé avec succès.' }); // issues/168
        },
    });

    // ------------//
    //   Seasons   //
    // ------------//
    fastify.route({
        method: 'POST',
        url: '/admin/seasons',
        schema: fastify.getSchema('API:POST/seasons'),
        handler: async (request: Request<POSTSeasonRequest>, reply: Reply) => {
            const { year, season_number } = request.body;
            await authService.isAdmin(request);
            await seasonService.createSeason(year, season_number);
            reply.code(201);
        },
    });

    // ------------//
    //    Users    //
    // ------------//
    fastify.route({
        method: 'DELETE',
        url: '/admin/users/:id',
        schema: fastify.getSchema('API:DELETE/admin/users/:id'),
        handler: async (request: Request<DELETEUserAsAdminRequest>, reply: Reply) => {
            const { id } = request.params;
            await authService.verifyPasswordOrThrow(request.user.id, request.body.password);
            await authService.isAdmin(request);
            await userService.deleteUser(id);
            reply.code(200).send({ message: 'Utilisateur supprimé avec succès.' }); // issues/168
        },
    });
});
