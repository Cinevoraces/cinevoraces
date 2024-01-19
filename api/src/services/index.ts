import { type FastifyPluginCallback, type FastifyReply as Reply, type FastifyRequest as Request } from 'fastify';
import authService, { type TAuthService } from './authService';
import movieService, { type TMovieService } from './movieService';
import reviewService, { type TReviewService } from './reviewService';

declare module 'fastify' {
    interface FastifyInstance {
        _authService: TAuthService;
        _movieService: TMovieService;
        _reviewService: TReviewService;
        verifyAccessToken: (request: Request, reply: Reply) => void;
        verifyAccessTokenOptionnal: (request: Request, reply: Reply) => void;
        verifyRefreshToken: (request: Request, reply: Reply) => void;
        verifyPassword: (request: Request, reply: Reply) => void;
        findOrCreateReview: (request: Request, reply: Reply) => void;
        throwIfMovieNotFound: (request: Request, reply: Reply) => void;
        throwIfMovieFound: (request: Request, reply: Reply) => void;
        throwIfMovieIsPublished: (request: Request, reply: Reply) => void;
        throwIfProposalChecksFails: (request: Request, reply: Reply) => void;
        adminThrowIfMovieIsPublished: (request: Request, reply: Reply) => void;
        isAdmin: (request: Request, reply: Reply) => void;
    }
}

/**
 * **Services Registration _index**
 * Add any new service to this array (order matters!).
 */
export default [authService, movieService, reviewService] as Array<FastifyPluginCallback>;
