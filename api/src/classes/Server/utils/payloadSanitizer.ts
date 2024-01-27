import { sanitizeObject } from '@src/utils';
import { type FastifyRequest as Request } from 'fastify';
import plugin from 'fastify-plugin';

export default plugin(async fastify => {
    /**
     * **Sanitize Payload**
     * Look for any HTML tags in the payload and remove them.
     * This hook is executed on every endpoints.
     */
    fastify.addHook('preHandler', async (request: Request) => {
        if (request.body) request.body = sanitizeObject(request.body as Record<string, unknown>);
    });
});
