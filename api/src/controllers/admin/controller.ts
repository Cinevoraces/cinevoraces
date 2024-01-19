import { EResponseMessages } from '@src/types';
import { type FastifyReply as Reply, type FastifyRequest as Request } from 'fastify';
import plugin from 'fastify-plugin';
import schemas from './schemas';
import createService from './service';
import type { DELETEMovieAsAdminRequest, PUTMovieAsAdminRequest } from './types';
import { type POSTSeasonRequest } from './types';

export default plugin(async fastify => {
    const { createSeason, deleteComment, deleteMovie, deleteUser, getReviews, publishMovie } = await createService(
        fastify.postgres,
    );
    fastify.addSchemas(schemas);

    // ------------//
    //    Movies   //
    // ------------//
    fastify.route({
        method: 'PUT',
        url: '/admin/movies/publish/:id',
        schema: fastify.getSchema('API:PUT/admin/movies/publish/:id'),
        onRequest: [fastify.isAdmin],
        preValidation: [fastify.verifyPassword, fastify.adminThrowIfMovieIsPublished],
        handler: async (request: Request<PUTMovieAsAdminRequest>, reply: Reply) => {
            await publishMovie(request.params.id);
            reply.code(201).send({ message: 'La proposition a bien été publiée.' });
        },
    });

    fastify.route({
        method: 'DELETE',
        url: '/admin/movies/:id',
        schema: fastify.getSchema('API:DELETE/admin/movies/:id'),
        onRequest: [fastify.isAdmin],
        preValidation: [fastify.verifyPassword, fastify.throwIfMovieNotFound],
        handler: async (request: Request<DELETEMovieAsAdminRequest>, reply: Reply) => {
            await deleteMovie(request.params.id);
            reply.code(201).send({ message: EResponseMessages.DELETE_MOVIE_SUCCESS });
        },
    });

    // ------------//
    //   Reviews   //
    // ------------//
    fastify.route({
        method: 'GET',
        url: '/admin/reviews',
        schema: fastify.getSchema('API:GET/admin/reviews'),
        onRequest: [fastify.isAdmin],
        handler: async (request: Request, reply: Reply) => {
            const { rows: reviews } = await getReviews(request.query);
            reply.code(200).send(reviews);
        },
    });

    fastify.route({
        method: 'DELETE',
        url: '/admin/reviews/:movieId/:userId',
        schema: fastify.getSchema('API:DELETE/admin/reviews/:movieId/:userId'),
        onRequest: [fastify.isAdmin],
        preValidation: [fastify.verifyPassword],
        handler: async (request: Request<{ Params: { movieId: number; userId: number } }>, reply: Reply) => {
            const { movieId, userId } = request.params;
            await deleteComment(movieId, userId);
            reply.code(201).send({ message: EResponseMessages.DELETE_COMMENT_SUCCESS });
        },
    });

    // ------------//
    //   Seasons   //
    // ------------//
    fastify.route({
        method: 'POST',
        url: '/admin/seasons',
        schema: fastify.getSchema('API:POST/seasons'),
        onRequest: [fastify.isAdmin],
        handler: async (request: Request<POSTSeasonRequest>, reply: Reply) => {
            const { year, season_number } = request.body;
            await createSeason(year, season_number);
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
        onRequest: [fastify.isAdmin],
        preValidation: [fastify.verifyPassword],
        handler: async (request: Request<{ Params: { id: number } }>, reply: Reply) => {
            const { id } = request.params;
            await deleteUser(id);
            reply.code(200).send({ message: EResponseMessages.DELETE_USER_SUCCESS });
        },
    });
});
