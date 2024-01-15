import type { FastifyReply as Reply, FastifyRequest as Request } from 'fastify';
import type { TAuthService } from '../../services/authService';
import type { TErrorService } from '../../services/errorService';
import type { TFileService } from '../../services/fileService';
import type { TMovieService } from '../../services/movieService';
import type { TReviewService } from '../../services/reviewService';
import type { TUserService } from '../../services/userService';

// Extend FastifyInstance interface to include services, hooks and plugins
declare module 'fastify' {
    interface FastifyInstance {
        _fileService: TFileService;
        _errorService: TErrorService;
        _authService: TAuthService;
        _movieService: TMovieService;
        _reviewService: TReviewService;
        _userService: TUserService;
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
