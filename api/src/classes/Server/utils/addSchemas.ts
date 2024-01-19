import plugin from 'fastify-plugin';

/**
 * Simple schema helper for Fastify server.
 */
export default plugin(async fastify => {
    fastify.decorate('addSchemas', s => s.forEach((schema: unknown) => fastify.addSchema(schema)));
});

declare module 'fastify' {
    interface FastifyInstance {
        addSchemas(schema: unknown[]): void;
    }
}
