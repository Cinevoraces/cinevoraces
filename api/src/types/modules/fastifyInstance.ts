import type {
  FastifyRequest as Request,
  FastifyReply as Reply,
} from 'fastify';
import type { Pool } from 'pg';

declare module 'fastify' {
  interface FastifyRequest {
    pgClient: Pool;
    error: { send: (message: string, statusCode: number, detailedMessage?: string)=>void };
    bcryptCompare: (pass_1: string, pass_2: string)=>Promise<boolean>;
    bcryptHash: (password: string)=>Promise<string>;
  }
  interface FastifyInstance {
    pgClient: Pool;
    error: { send: (message: string, statusCode: number, detailedMessage?: string)=>void };
    bcryptCompare: (pass_1: string, pass_2: string)=>Promise<boolean>;
    bcryptHash: (password: string)=>Promise<string>;

    // Hooks
    findOrCreateReview: (request: Request, reply: Reply)=>void;
    doesMovieExist: (request: Request, reply: Reply)=>void;
    movieProposalSafeGuards: (request: Request, reply: Reply)=>void;
    putMovieSafeGuards: (request: Request, reply: Reply)=>void;
    verifyPassword: (request: Request, reply: Reply)=>void;
    isAdmin: (request: Request, reply: Reply)=>void;
    verifyAccessToken: (request: Request, reply: Reply)=>void;
    verifyAccessTokenOptionnal: (request: Request, reply: Reply)=>void;
    verifyRefreshToken: (request: Request, reply: Reply)=>void;
  }
}
