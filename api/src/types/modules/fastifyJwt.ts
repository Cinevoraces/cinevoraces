import type { Database } from '../Database';

declare module '@fastify/jwt' {
  interface VerifyOptions {
    onlyCookie: boolean;
  }
  interface FastifyJWT {
    user: {
      id?: number;
      pseudo?: string;
      mail?: string;
      role?: string;
      avatar_url?: string;
      previous_review?: Partial<Database.review>;
    };
  }
}
