import type { review, Roles } from '../_index';

declare module '@fastify/jwt' {
  interface VerifyOptions {
    onlyCookie: boolean;
  }
  interface FastifyJWT {
    user: {
      id?: number;
      pseudo?: string;
      mail?: string;
      role?: Roles;
      avatar_url?: string;
      previous_review?: Partial<review>;
    };
  }
}
