import type {
  FastifyRequest as Request,
  FastifyReply as Reply,
} from 'fastify';
import type { Pool } from 'pg';

declare module 'fastify' {
  interface FastifyRequest {
    pgClient: Pool;
    bcryptCompare: (pass_1: string, pass_2: string)=>Promise<boolean>;
    bcryptHash: (password: string)=>Promise<string>;
  }
  interface FastifyInstance {
    pgClient: Pool;
    bcryptCompare: (pass_1: string, pass_2: string)=>Promise<boolean>;
    bcryptHash: (password: string)=>Promise<string>;

    // Hooks
    findOrCreateReview: (request: Request, reply: Reply)=>void;
    doesMovieExist: (request: Request, reply: Reply)=>void;
    doesPropositionExist: (request: Request, reply: Reply)=>void;
    hasProposition: (request: Request, reply: Reply)=>void;
    isSlotBooked: (request: Request, reply: Reply)=>void;
    isMoviePublished: (request: Request, reply: Reply)=>void;
    verifyPassword: (request: Request, reply: Reply)=>void;
    isAdmin: (request: Request, reply: Reply)=>void;
    verifyAccessToken: (request: Request, reply: Reply)=>void;
    verifyAccessTokenOptionnal: (request: Request, reply: Reply)=>void;
    verifyRefreshToken: (request: Request, reply: Reply)=>void;
  }
}
