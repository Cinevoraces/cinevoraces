import type { ERoles } from '../enums/_index';

declare module '@fastify/jwt' {
    interface VerifyOptions {
        onlyCookie: boolean;
    }
    interface FastifyJWT {
        user: {
            id?: number;
            pseudo?: string;
            mail?: string;
            role?: ERoles;
            document_group_id?: number;
            previous_review?: {
                comment?: string;
                rating?: number;
                bookmarked?: boolean;
                viewed?: boolean;
                liked?: boolean;
            };
        };
    }
}
